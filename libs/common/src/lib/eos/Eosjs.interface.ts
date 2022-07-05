import { ResourcePayer } from "eosjs/dist/eosjs-api-interfaces";

export interface TransferInfo<T> {
    privateKey: string;
    data: {
        expiration?: string;
        ref_block_num?: number;
        ref_block_prefix?: number;
        max_net_usage_words?: number;
        max_cpu_usage_ms?: number;
        delay_sec?: number;
        context_free_actions?: Action<T>[];
        context_free_data?: Uint8Array[];
        actions: Action<T>[];
        transaction_extensions?: [number, string][];
        resource_payer?: ResourcePayer;
    };
}

export interface Action<T> {
    account: string;
    name: string;
    authorization: {
        actor: string;
        permission: string;
    }[];
    data: T;
}
