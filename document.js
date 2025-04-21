document.getElementById('formularioCedula').addEventListener('submit', function(event) {
    event.preventDefault();
    validarCedula();
  });
  
  function validarCedula() {
    const resultadoDiv = document.getElementById('resultado');
    const cedula = document.getElementById('cedulaInput').value.trim();
  
    // Verificar que la cédula tenga 11 dígitos numéricos
    if (cedula.length !== 11 || !/^\d+$/.test(cedula)) {
      resultadoDiv.textContent = "La cédula debe contener 11 dígitos numéricos.";
      resultadoDiv.style.color = "red";
      return;
    }
  
    let suma = 0;
    
    // Recorrer los 10 primeros dígitos y aplicar los multiplicadores
    for (let i = 0; i < 10; i++) {
        const digito = parseInt(cedula[i]);
        const multiplicador = (i % 2 === 0) ? 1 : 2;
        let producto = digito * multiplicador;
        
        // Si el producto es mayor o igual a 10, se le resta 9
        if (producto >= 10) {
          producto -= 9;
        }
        suma += producto;
      }
  
    const residuo = suma % 10;
    const digitoVerificadorCalculado = (residuo === 0) ? 0 : 10 - residuo;
    const digitoVerificador = parseInt(cedula[10]);
  
    if (digitoVerificadorCalculado === digitoVerificador) {
      resultadoDiv.textContent = `Cédula válida. `;
      resultadoDiv.style.color = "green";
    } else {
      resultadoDiv.textContent = "Cédula inválida.";
      resultadoDiv.style.color = "red";
    }
  }
  