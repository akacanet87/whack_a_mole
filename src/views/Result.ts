const ResultDom = `
<section>
  <div class="result container">
    <div class="result-box">
      <h2>획득하신 점수는??</h2>
      <h3>
        0점
      </h3>
      <p>
        두더지 게임 재미있으셨나요??
      </p>
    </div>
    <div class="button-box">
      <button class="restart" id="restartButton">
        한번더하기
      </button>
      <button class="stop" id="stopButton">
        그만하기
      </button>
    </div>
  </div>
</section>
`

export default ResultDom

// const Result = new DOMParser().parseFromString(ResultDom, 'text/html')
//
// export default Result.body.firstChild