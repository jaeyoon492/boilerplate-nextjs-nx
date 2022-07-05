# NxBoilerplateNextjs

- [Nx cli 설치](#nx-cli-설치)
- [Nx Workspace 설치](#nx-workspace-설치)
- [@nrwl/next 설치](#nrwlnext-설치)
- [앱(모듈: 프로젝트) 생성](#앱모듈-프로젝트-생성)
- [(모듈: 프로잭트) 생성후 체크 사항](#모듈-프로잭트-생성후-체크-사항)
- [라이브러리 생성](#라이브러리-생성)
- [NextJs 페이지, 컴포넌트 생성](#nextjs-페이지-컴포넌트-생성)
- [app에서 라이브러리 사용](#app에서-라이브러리-사용)
- [개발 로컬 서버 실행](#개발-로컬-서버-실행)

### Nx cli 설치

```bash
# 필수 설치
npm install -g nx
```

### Nx Workspace 설치

```bash
# 필수 X
npx create-nx-workspace@latest
#or
npx create-nx-workspace --preset=next #for NextJs
```

### nrwl/next 설치

-   기존 Nx 작업 공간에 Next.js를 추가하려면`@nrwl/next`패키지를 설치하세요.
-   버전과 일치하는 버전을 설치해야 합니다.

```bash
# 필수 X
yarn add --dev @nrwl/next
```

### 앱(모듈: 프로젝트) 생성

-   apps 내부에 프로젝트를 추가 할 수 있습니다.
-   패키지 단위로 관리하려는 프로젝트를 옮기거나, 만들수 있습니다.

```bash
nx g @nrwl/next:app project-a # apps/project-a
nx g @nrwl/next:app project-b # apps/project-b
nx g @nrwl/next:app project-c # apps/project-c
```

### (모듈: 프로잭트) 생성후 체크 사항

```bash
# nx.json
# 필수 체크

 "generators": {
        "@nrwl/react": {
            "application": {
                "babel": false # swc 컴파일러 사용시 false로 체크 되어있는지 체크
            }
        },
    },

```

### 라이브러리 생성

Nx를 사용하면 단 하나의 명령으로 라이브러리를 생성할 수 있습니다. 라이브러리를 생성하려는 몇 가지 이유는 다음과 같습니다.

-   애플리케이션 간에 코드 공유
-   monorepo 외부에서 사용할 패키지 게시
-   `nx graph`를 사용하여 아키텍처를 더 잘 시각화

```bash
nx g @nrwl/next:lib my-new-lib
```

### NextJs 페이지, 컴포넌트 생성

모듈 프로젝트를 지정해서 하위에 페이지나 컴포넌트를 생성 할 수 있다. [ 필수 X ]

```bash
nx g @nrwl/next:page pageA --project=project-a

nx g @nrwl/next:component componentA --project=project-a
```

### app에서 라이브러리 사용

-   공통 모듈 임포트

```tsx
// apps/my-next-app/pages/index.tsx
import { MyNewLib } from "@libs/../my-new-lib";

export function Index() {
    return (
        <MyNewLib>
            <p>The main content</p>
        </MyNewLib>
    );
}

export default Index;
```

### 개발 로컬 서버 실행

```bash
nx serve # 모듈 전체 실행

nx serve project-a # project-a만 실행
```

### 공통 모듈 절대경로 설정

```bash
# tsconfig.base.json

"@NxSomeModule": ["libs/my-new-lib/src/lib/module"]

```
