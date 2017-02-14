/**
 * Created by jerome on 24/01/2017.
 */

window.onload = createGraph();

function createGraph() {
    var valBanque = [30, 200, 100, 400, 150, 250];
    var valActions = [50, 20, 10, 40, 15, 25];
    drawGraph(valBanque, valActions);
    var valBanqueToAdd = 30;
    var valActionsToBuy = 60;
    setTimeout(function () {
        updateValue(valBanqueToAdd, valActionsToBuy);
    }, 1000);
    valBanqueToAdd = 80;
    valActionsToBuy = 90;
    setTimeout(function () {
        updateValue(valBanqueToAdd, valActionsToBuy);
    }, 2000);
}

function updateValue(valVanque, valAction){
    chart.flow({
        columns: [
            ['Valeur banque', valVanque],
            ['Valeur actions', valAction]
        ]
    });
}

function drawGraph(valBanque, valActions){
    chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                ['Valeur banque', valBanque[0], valBanque[1], valBanque[2], valBanque[3], valBanque[4], valBanque[5]],
                ['Valeur actions', valActions[0], valActions[1], valActions[2], valActions[3], valActions[4], valActions[5]]
            ]
        }
    });
}