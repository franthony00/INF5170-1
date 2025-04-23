document.addEventListener("DOMContentLoaded", function () {
  const salesData = [];
  const form = document.getElementById('salesForm');
  const ctx = document.getElementById('salesChart').getContext('2d');

  let chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Ventas por mes',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const month = document.getElementById('month').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!month || isNaN(amount)) return;

    salesData.push({ month, amount });
    chart.data.labels.push(month);
    chart.data.datasets[0].data.push(amount);
    chart.update();
    form.reset();
  });
});
