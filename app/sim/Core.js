Ext.define('bo.sim.Core', {
  config: {
    processor: null,
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
      if (part.getFinishTime() <= time) {
        part.finish();
        this.currentPart = null;
      }
    }

  },
  getCurrentPart: function () {
    return this.currentPart;
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
        var p = this.currentPart = q.consumeTaskPart();
        var finishTime = time + Math.ceil(p.getSize() / this.getPerformance());
        p.setFinishTime(finishTime);
        this.getProcessor().getTimeline().registerTime(finishTime);
      }
    }
  }
});