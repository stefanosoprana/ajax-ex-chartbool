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
      var ctx = $('.dashboard')
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: arrayLabels,
          datasets: [{
            label: "Vendite",
            borderColor: 'rgb(255, 99, 132)',
            data: arrayData,
          }],
          options: {}
        },
      });
    },
    error: function(){
      alert('si è verificato un errore')
    }
  })
});
