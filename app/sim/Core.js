Ext.define('bo.sim.Core', {
  config: {
    processor: null,
    order: 0,
    performance: 1 //jedna jednostka obsługi na sekundę
  },
  constructor: function (config) {
    this.initConfig(config);
    this.currentPart = null;
  },
  /**
   * tutaj trzeba zakończyć zadania które do tego czasu się powinny skończyc
   * @param time
   */
  processPhase1: function (time) {
    var part = this.currentPart;
    if (part) {
      var partWorkDone = this.calculateWork(time - part.getStartTime());
      part.setWorkDone(partWorkDone);
      if (part.getFinishTime() <= time) {
        part.finish();
        this.currentPart = null;
      }
      console.log("task unfinished ", part.getTask().getUnfinished(), part.getTask().toString(), 'on time',  time);
    }

  },
  getCurrentPart: function () {
    return this.currentPart;
  },
  isBusy: function () {
    return this.currentPart != null;
  },
  calculateWork: function (duration) {
    return duration * this.getPerformance();
  },
  /**
   * tutaj trzeba pobrać z kolejki kwanty do obróbki
   * @param time
   */
  processPhase2: function (time) {
    if (this.currentPart == null) {
      //mamy wolny procek, dawaj no tutaj parta
      var q = this.getProcessor().getQueue();
      if (q.canConsumeTaskPart()) {
        var p = this.currentPart = q.consumeTaskPart(this);
        var duration = (p.getSize() / this.getPerformance());
        var finishTime = time + duration;
        p.setStartTime(time);
        p.setFinishTime(finishTime);
        this.getProcessor().getTimeline().registerTime(finishTime);
        p.start(this, time);
      }
    }
  }
});