import { Component } from '@angular/core';
import * as zc from '@dvsl/zoomcharts';
// import zc from "@dvsl/zoomcharts"

import { WindowRef } from './WindowRef'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-zoom-demo';
  count: number;
  chart: any;
  menuElement: any;
  videoUrl: string;
  private zc: any = zc;
  extraImageArr = []
  constructor(private winRef: WindowRef) {
    // Add license key
    winRef.nativeWindow.ZoomChartsLicense = '';
    winRef.nativeWindow.ZoomChartsLicenseKey = '';
    this.generateArray();
  }

  generateArray() {
    for (let i = 14; i <= 100; i++) {
      let val = `m-${i}`
      this.extraImageArr.push(val)
    }
    console.log(this.extraImageArr);
  }

  ngAfterViewInit() {
    var chartContainer = document.getElementById("chartPieChart");
    this.menuElement = document.createElement("div");
    this.menuElement.style.zIndex = '9999';
    this.menuElement.style.display = "none";
    this.menuElement.style.position = "absolute";
    this.menuElement.style.background = "#eee";
    this.menuElement.style.border = "1px solid #09c";
    this.menuElement.style.padding = "0px";
    document.body.append(this.menuElement);


    const NetChart = this.zc.NetChart;
    var self = this;
    this.chart = new NetChart({
      "navigation": {
        "focusNodeExpansionRadius": 3,
        "initialNodes": [
          "m-1",
          "m-3",
          "m-4",
        ],
        "mode": "focusnodes"
      },
      "events": {
        onClick: function(event, args){self.graphClick(event, args)},
        // onSelectionChange: function (event) { self.onNodeSelections(event) },
      },

      "style": {
        "node": {
          "display": "image",
          "lineWidth": 2,
          "lineColor": "#2fc32f",
          "imageCropping": true,
        },
        "nodeStyleFunction": function (node) {
          node.image = self.getImages(node.id);
          node.label = node.data.name;
          if (node.focused) {
            node.fillColor = "orange";
            node.radius = 200;
            node.display = 'rectangle';
            // node.fillRect = [100, 200, 200, 200]
          }
        },

        "linkStyleFunction":
          function (link) {
            link.fillColor = 'orange';
          },
      },


      "container": chartContainer,
      "data": [
        {
          "url": "/assets/response.json"
        }

      ],
      "toolbar": {
        "fullscreen": true,
        "enabled": true
      },
      "interaction": {
        "resizing": {
          "enabled": true
        }
      },
      "isFullscreen": true,
    })
  }
  getImages(id) {
    const marvelImages = this.extraImageArr.includes(id)
    const months = ["top_captainmarvel", "top_hulk", "top_blackwidow", "top_daredevil", "drdoom", "top_thor", "top_ironman", "top_captainamerica", "September", "top_wolverine", "redskull", "thanos"];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    // if (id == 'm-1') {
    //   return '/assets/frame0.jpg';
    // }
    if (marvelImages) {
      return `http://marvel-force-chart.surge.sh/marvel_force_chart_img/${randomMonth}.png`
    }
    return "https://zoomcharts.com/dvsl/data/net-chart/friend-net/" + id + ".png"
  }

  graphClick(event, args) {
    // console.log(event);
    var selectedNodes = this.chart.selection();
    console.log('selectedNodes', selectedNodes[0]);
    this.videoUrl = selectedNodes[0].data.video;

    this.menuElement.style.display = "block";
    this.menuElement.style.left = event.pageX + "px";
    this.menuElement.style.top = event.pageY + "px";

    // fill the menu element based on the node that was clicked.
    if (args.clickNode) {
        this.menuElement.innerHTML = `<div><video width="200" controls>
        <source src="../assets/sample.mp4" type="video/mp4">
      </video></div>`
    } else if (args.clickLink) {
        this.menuElement.innerHTML = "Link menu";
    } else {
        // hidePopup();
    }

    // disable the default context menu
    event.preventDefault();

    if (selectedNodes.length === 0) {//test the click was on empty space
      console.log('thisisclick');
    }

  //   this.chart.updateSettings({
  //     area: { left: -100, top: -100, width: 0, height: 0 }
  // });
  }

  onNodeSelections(event) {
    var selection = event.selection;
    console.log(selection);
    var contents = [];
    for (var i = 0; i < selection.length; i ++){
        var item = selection[i];
        var type = (item.isNode) ? "node": "link";
        contents.push(type + " " + item.id);
      }
      this.menuElement.style.display = "inline";
    this.menuElement.style.left = event.pageX + "px";
    this.menuElement.style.top = event.pageY + "px";
        this.menuElement.innerHTML = `<div><video width="400" controls>
        <source src="../assets/sample.mp4" type="video/mp4">
      </video></div>`
    console.log('contents', contents);
  }
}
