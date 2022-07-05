import fetch from "cross-fetch";
import { JsonRpc, Api } from "eosjs";
import { TransactResult } from "eosjs/dist/eosjs-api-interfaces";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import {
    PushTransactionArgs,
    ReadOnlyTransactResult,
} from "eosjs/dist/eosjs-rpc-interfaces";
import { TransferInfo } from "./Eosjs.interface";

class EosRpc {
    private static instance: EosRpc;
    private rpc: JsonRpc;
    private textDecoder = new TextDecoder();
    private textEncoder = new TextEncoder();

    // 연결할 노드 엔드포인드 env에 추가 후 연동
    constructor() {
        this.rpc = new JsonRpc(`${process.env}`, {
            fetch,
        });
    }

    public static get Instance(): EosRpc {
        return this.instance || (this.instance = new this());
    }

    public async getChainInfo() {
        const info = await this.rpc.get_info();
        return { info };
    }

    public async transfer<T>(
        transferInfo: TransferInfo<T>
    ): Promise<PushTransactionArgs | TransactResult | ReadOnlyTransactResult> {
        const signatureProvider = new JsSignatureProvider([
            transferInfo.privateKey,
        ]);

        const api = new Api({
            rpc: this.rpc,
            signatureProvider,
            textDecoder: this.textDecoder,
            textEncoder: this.textEncoder,
        });

        try {
            const response = await api.transact(transferInfo.data, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            return response;
        } catch (error: any) {
            const failResult = {
                type: "trxResult",
                trxResult: { status: false, error: error.message },
            };

            const failResultParse = JSON.stringify(failResult);
            localStorage.setItem("trxResult", failResultParse);

            throw new Error(`Transaction failed: ${error.message}`);
        }
    }
}

export default EosRpc.Instance;
