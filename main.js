$(document).ready(function(){
  $.ajax({
    url: 'http://157.230.17.132:4018/sales',
    method: 'GET',
    success: function(data){
      var oggetto = {};
      for (var i = 0; i < data.length; i++) {
        var dataCompleta = data[i].date;
        var dataParse = moment(dataCompleta, 'DD-MM-YYYY');
        var mesi = dataParse.format('MMMM')
        if (oggetto[mesi] == undefined) {
          oggetto[mesi] = 0
        }
        oggetto[mesi] += data[i].amount;
      }
      console.log(oggetto);

      var arrayLabels = [];
      var arrayData = [];

      for (var key in oggetto) {
        arrayLabels.push(key);
        arrayData.push(oggetto[key])
      }
      var ctx = $('.dashboard1')
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: arrayLabels,
          datasets: [{
            label: "Vendite",
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
            data: arrayData,
          }],
          options: {}
        },
      });
      var oggetto2 = {};
      var venditeTotali = 0
      for (var i = 0; i < data.length; i++) {
        var salesman = data[i].salesman;
        if (oggetto2[salesman] == undefined) {
          oggetto2[salesman] = 0
        }
        oggetto2[salesman] += data[i].amount;
        venditeTotali += data[i].amount
      }
      console.log(venditeTotali);
      console.log(oggetto2);

      var arrayLabelsPie = [];
      var arrayDataPie = [];

      for (var key2 in oggetto2) {
        arrayLabelsPie.push(key2);
        arrayDataPie.push((oggetto2[key2] / venditeTotali) * 100);
      }

      var ctx = $('.dashboard2')
      var myLineChart = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [{
            data: arrayDataPie,
            backgroundColor: ['lightgreen', 'lightblue', 'lightyellow', 'lightcoral' ]
          }],
        labels: arrayLabelsPie
        },
      });

    },
    error: function(){
      alert('si è verificato un errore')
    }
  })
});
