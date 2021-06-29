const GameDom = `
<section>
  <div class="game container">
    <div class="board-box">
      <div class="score-line">
        <dl>
          <dt>
            점수 :
          </dt>
          <dd id="scoreBoard"></dd>
        </dl>
        <dl>
          <dt>
            남은 시간 :
          </dt>
          <dd id="timeBoard"></dd>
        </dl>
      </div>
      <div class="button-line">
        <button class="pause" id="pauseButton">
          일시정지
        </button>
        <button class="stop" id="stopButton">
          그만하기
        </button>
      </div>
    </div>
    <div id="moleBox" class="mole-box"></div>
  </div>
</section>
`

export default GameDom

// const Game = new DOMParser().parseFromString(GameDom, 'text/html')
//
// export default Game.body.firstChild