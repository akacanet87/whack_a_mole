<h1 align="center">
<br>
  <img src="https://www.clipartkey.com/mpngs/m/134-1344782_transparent-background-cute-groundhog-clipart.png" alt="Front-End Performance Checklist" width="160" height="240" />
  <br>
  <br>
  두더지 잡기 게임
  <br>
</h1>

<h3 align="center">
추억의 두더지 게임!
</h3>
<h3 align="center">
하다 보면 자꾸 하게 되는 중독성이 강한 게임!
</h3>
<h3 align="center">
모두 같이 두더지를 잡아보아요~
</h3>

---

## 목차

1. **[실행 방법](#실행방법)**
2. **[설계 목표](#설계목표)**
3. **[프로젝트 구성](#프로젝트구성)**

---

## 실행방법

```
// 로컬에서 사용
npm run dev
or
yarn run dev

// 빌드 후 실행
npm run build && npm run start
or
yarn run build && yarn run start
```

## 설계목표

- VanillJs + Webpack + Typescript + Scss 로 프로젝트를 구성한다.
- 최초 화면에서 가로와 세로 구멍 수 및 출현시킬 두더지르의 수를 입력 받는다.
- 가로와 세로는 각각 최소 2이상 6이하로 설정하도록 한다.
- 출현시킬 두더지의 최대값은 총 구멍 수의 반 미만이어야 한다.
- 페이징 처리를 통해 `홈`, `게임`, `결과` 의 화면을 보여주도록 한다.
- 상태 관리를 통해 처음 입력 받은 값 및 게임 점수를 페이지별로 공유가 가능하도록 한다.
- `60초` 제한시간 동안 두더지를 잡는다.
- 제한시간이 줄어듬에 따라 두더지가 사라지는 속도를 높인다.
- 가짜 두더지를 랜덤하게 출몰 시켜 가짜 두더지 클릭 시 감점한다.
- `일시중지`, `재시작`, `그만하기` 기능이 가능하도록 구현한다.
- 제한시간이 완료되면 결과 페이지로 이동한다.
- 결과 페이지에서 초기 화면으로 이동 및 같은 설정으로 게임 재시작이 가능하도록 구현한다.
- 디자인 요소를 이용하여 재미를 줄 수 있도록 한다.


## 프로젝트구성

```
.
├── /dist/                      # Build 후 번들링을 통해 구성된 파일 output 폴더
├── /node_modules/              # 라이브러리 모듈
├── /src/                       # 프로젝트 소스 root 폴더
│   ├── /assets/                # 이미지, 스타일 등의 자산과 관련된 폴더
│   │   ├── /images/            # 이미지 폴더
│   │   └── /styles/            # scss 로 작성한 스타일 파일 모음 폴더
│   │       ├── common.scss     # 공용 css 작성 파일, /home, /game, /result 의 css 포함
│   │       ├── mixins.scss     # mixin 기능 css 작성 파일
│   │       └── variables.scss  # 변수 css 작성 파일
│   ├── /router/                #  
│   │   └── index.ts            # 라우팅 처리하기위한 router 기본 세팅 파일
│   ├── /scripts/               # 각 페이지 별 또는 공용 기능 담당 함수 구현 파일 모음 폴더
│   │   ├── game.ts             # /game 페이지의 기능을 담당하는 함수 구현 파일
│   │   ├── home.ts             # / 페이지의 기능을 담당하는 함수 구현 파일
│   │   ├── result.ts           # /result 페이지의 기능을 담당하는 함수 구현 파일
│   │   └── utils.ts            # 로직과 관련한 함수 중 중립성이나 공통성을 보이는 함수를 구현한 파일
│   ├── /static/                # favicon.ico 파일 등 정적 파일 담기 위한 폴더
│   ├── /store/                 #
│   │   └── index.ts            # 상태관리를 위한 설정 파일, Vuex 의 형태를 모방하여 구성함
│   ├── /views/                 # 각 페이지별 화면 구성 폴더
│   │   ├── Game.ts             # /game 페이지 dom 파일
│   │   ├── Home.ts             # / 페이지 dom 파일
│   │   └── Result.ts           # /result 페이지 dom 파일
│   ├── /app.ts                 # app 의 메인 실행부 파일
│   └── /index.html             # 전체 페이지를 싱글페이지어플리케이션으로 세팅하기 위한 index 파일
│── .babelrc                    # babel 세팅 명세 파일
│── .eslintrc.js                # eslint 명세 파일
│── .gitignore                  # git 커밋 시 무시할 파일 또는 폴더를 명시한 파일
│── package.json                # 설치를 위한 라이브러리 명시와 script 명령어를 위한 파일, 이 파일을 기준으로 node_moudle 이 설치됨
│── postcss.config.js           # autoprefix 를 위한 postcss 의 명세 파일
│── tsconfig.json               # typescript 세팅 명세 파일
│── webpack.config.js           # webpack 사용시의 세팅을 위한 파일
└── yarn.lock                   # yarn 을 통해 빌드할 경우 각 모듈의 버전관리가 명시되어 있는 파일
```

---

###***특별히 사용한 라이브러리***

- `vanilla-router` : 페이지 라우팅 기능을 구현하기 위해 사용
