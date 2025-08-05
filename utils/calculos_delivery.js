
function gerarCoordenadaEntre(a, b) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function gerarObstaculo(drone_x, drone_y, dest_x, dest_y) {
  const existe = Math.random() < 0.5; 

  if (!existe) return null;

  let obstacle_x, obstacle_y;

  do {
    obstacle_x = gerarCoordenadaEntre(drone_x, dest_x);
    obstacle_y = gerarCoordenadaEntre(drone_y, dest_y);
  } while (obstacle_x === dest_x && obstacle_y === dest_y);

  return { obstacle_x, obstacle_y };
}


function calcularDistancia(drone_x, drone_y, dest_x, dest_y, obstaculo = null) {
  const deltaX = dest_x - drone_x;
  const deltaY = dest_y - drone_y;

  let distancia = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  if (obstaculo) {
    console.log('Obstáculo gerado! Adicionando +2km ao trajeto');
    distancia += 2;
  }

  return Math.round(distancia);
}

module.exports = {

  gerarObstaculo,
  calcularDistancia,
  gerarCoordenadaEntre
};
  