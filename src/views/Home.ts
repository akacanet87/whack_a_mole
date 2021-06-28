const HomeDom = `
<section>
  <div class="main container">
    <h2>
      두더지 게임
    </h2>
    <h3>
      추억의 두더지 게임!<br />
      하다 보면 자꾸 하게 되는 중독성이 강한 게임!<br />
      모두 같이 두더지를 잡아보아요~
    </h3>
    <div class="input-line">
      <label for="xAxis">
        가로 구멍 수 :
      </label>
      <input id="xAxis" placeholder="2~6 사이의 수를 입력해주세요">
    </div>
    <div class="input-line">
      <label for="yAxis">
        세로 구멍 수 :
      </label>
      <input id="yAxis" placeholder="2~6 사이의 수를 입력해주세요">
    </div>
    <div class="input-line">
      <label for="moleLimit">
        두더지 수 :
      </label>
      <input id="moleLimit" placeholder="나타날 두더지의 수를 입력해주세요">
    </div>
    <p class="info-line">
      * 두더지 수는 총 구멍수의 반 이하로 입력해주세요.
    </p>
    <div class="info-box">
      <div class="game-info">
        <div class="mole">
          <img src="./assets/images/mole.png" alt="일반 두더지" />
          <h3>
            나는 +1 점씩!
          </h3>
          <p>
            이 두더지를 잡으면 점수가 1점씩 올라가요! :)
          </p>
        </div>
        <div class="mole fake">
          <img src="./assets/images/fake-mole.png" alt="감점 두더지" />
          <h3>
            나는 -1 점씩!
          </h3>
          <p>
            이 두더지를 잡으면 점수가 1점씩 감점이 되요! :(
          </p>
        </div>
      </div>
      <div class="rule-info">
        <ul>
          <li>
            첫번째! 60초 동안 최대한 많은 두더지를 잡아보세요~
          </li>
          <li>
            두번째! 랜덤하게 출몰하는 감점 두더지는 피해서 잡아보세요~
          </li>
          <li>
            세번째! 랜덤하게 출몰하는 감점두더지(핑크색두더지)는 피해서 잡아보세요~
          </li>
        </ul>
      </div>
    </div>
    <div class="button-box">
      <h3>
        자 이제 게임을 시작하러 가볼까요??
      </h3>
      <button id="startButton">
        게임시작
      </button>
    </div>
  </div>
</section>
`

export default HomeDom

// const Home = new DOMParser().parseFromString(HomeDom, 'text/html')
//
// export default Home.body.firstChild