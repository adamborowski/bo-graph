/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('bo.view.corevis.CoreVisController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.corevis',
  config: {
    chart: null,
    taskStore: null,
    processor: null,
    rowHeight: 24,
    headerWidth: 56,
    headerFillStyle: '#ffcc33'
  },
  init: function () {
    this.needsRedraw = true;
  },
  updateProcessor: function (p) {
    p.on('finish', this.onProcessorFinish, this);
  },
  updateChart: function (ch) {
    ch.on('redraw', this.onChartRedraw, this);
  },
  onProcessorFinish: function () {
    this.needsRedraw = true;
  },
  onChartRedraw: function () {
    if (this.needsRedraw)
      Ext.defer(this.doRedraw, 1, this);
    this.needsRedraw = false;
  },
  toChartX: function (time) {
    return time * this.matrix.getXX() + this.matrix.getDX();
  },
  doRedraw: function () {
    var chart = this.getChart(), processor = this.getProcessor();
    var timeAxis = chart.getAxis(1);
    this.matrix = timeAxis.getSprites()[0].attr.matrix
    //this.matrix = timeAxis.getSurface().matrix
    this.draw = this.lookupReference('draw');
    this.surface = this.draw.getSurface('main');
    this.processor = this.getProcessor();
    //
    this.setRowHeight((this.draw.getHeight() - 1) / this.processor.getCores().length);
    this.setHeaderWidth(chart.getInnerRect()[0]);
    //
    this.surface.removeAll();
    this.drawCores();
    this.draw.renderFrame();
  },
  drawCores: function () {
    var cores = this.processor.getCores();
    var surface = this.surface;
    var rowHeight = this.getRowHeight();
    for (var i = 0; i < cores.length; i++) {
      var core = cores[i];

      var rect = surface.add({
        type: 'rect',
        x: 0,
        y: rowHeight * i,
        width: this.getHeaderWidth(),
        height: rowHeight,
        fillStyle: this.getHeaderFillStyle()
      });
      var text = surface.add({
        type: 'text',
        text: "Core " + i,
        textAlign: 'center',
        x: rect.x + 0.5 * rect.width,
        y: rect.y + 0.5 * rect.height,
      });
      var events = this.processor.getOutput().getTimelineForProperty('finishedTaskParts');
      for (var j = 0; j < events.length; j++) {
        var event = events[j];
        var finishedParts = event.finishedTaskParts;
        for (var k = 0; k < finishedParts.length; k++) {
          var part = finishedParts[k];
          this.drawTaskPart(part.core, part.taskPart);
        }
      }
    }
  },
  drawTaskPart: function (core, part) {
    var surface = this.surface;
    var taskX = r(this.toChartX(part.getStartTime()));
    var taskX2 = r(this.toChartX(part.getFinishTime()));
    var color = part.getTask().getColor();

    function r(a) {
      return Math.round(a) + 0.5;
    }

    function size(a) {
      return Ext.util.Format.number(a, '#.#');
    }

    var drColor = Ext.draw.Color.fromString(color);
    var textOpacity = 0.4;
    var compo = surface.add({
      type: 'composite',
      x: taskX + this.getHeaderWidth(),
      y: r(this.getRowHeight() * core.getOrder())

    });

    var rect = surface.add({
      type: 'rect',
      x: taskX + this.getHeaderWidth(),
      width: taskX2 - taskX,
      y: r(this.getRowHeight() * core.getOrder()),
      height: this.getRowHeight(),
      fillStyle: color,
      strokeStyle: drColor.createDarker(0.2).toString(),
      strokeOpacity: 1,
      lineWidth: 1
    });
    var text = surface.add({
      type: 'text',
      fillStyle: 'white',
      fillOpacity: textOpacity,
      text: 'Task ' + (part.getTask().getOrder() + 1) + ' (' + size(part.getTask().getSize()) + ')',
      x: r(rect.x + 0.5 * rect.width),
      y: r(rect.y + 0.5 * rect.height),
      textAlign: 'center',
      fontSize: 13,
      fontWeight: 'bold'
    });
    var partText = surface.add({
      type: 'text',
      fillStyle: 'white',
      fillOpacity: textOpacity,
      text: Ext.String.format('#{0} ({1})', part.getOrder() + 1, size(part.getSize())),// '# ' + part.getOrder(),
      x: r(rect.x + 0.5 * rect.width),
      y: r(rect.y + 0.5 * rect.height) + 14,
      textAlign: 'center',
      fontSize: 12
    })
  }
});
