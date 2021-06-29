const HomeDom = `
<section>
  <div class="main container">
    <div class="info-area">
      <h2>
          두더지 게임
        </h2>
        <h3>
          추억의 두더지 게임!<br />
          하다 보면 자꾸 하게 되는 중독성이 강한 게임!<br />
          모두 같이 두더지를 잡아보아요~
        </h3>
        <div class="input-box">
          <label for="xAxis">
            가로 구멍 수 :
          </label>
          <input
              id="xAxis"
              type="number"
              placeholder="2~6 사이의 수를 입력해주세요">
        </div>
        <div class="input-box">
          <label for="yAxis">
            세로 구멍 수 :
          </label>
          <input
              id="yAxis"
              type="number"
              placeholder="2~6 사이의 수를 입력해주세요">
        </div>
        <div class="input-box">
          <label for="moleLimit">
            두더지 수 :
          </label>
          <input
              id="moleLimit"
              type="number"
              placeholder="나타날 두더지의 수를 입력해주세요">
        </div>
        <p class="info-text">
          * 두더지 수는 총 구멍수의 반 미만으로 입력해주세요.
        </p>
        <div class="info-box">
          <div class="game-info">
            <div class="mole">
              <div class="mole-image"></div>
              <h3>
                나는 +1 점씩!
              </h3>
              <p>
                이 두더지를 잡으면 점수가 1점씩 올라가요! :)
              </p>
            </div>
            <div class="mole fake">
              <div class="mole-image fake"></div>
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
  </div>
</section>
`

export default HomeDom

// const Home = new DOMParser().parseFromString(HomeDom, 'text/html')
//
// export default Home.body.firstChild