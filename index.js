// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;



function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
    disableDefaultUI: true,
  });
  infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const userImage = 'https://sh-server-pi.vercel.app/imgs/user-icon.svg';
          const pinImage = 'https://sh-server-pi.vercel.app/imgs/pin-icon.svg';
        
          const symbolMarker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: userImage
          })

          // Carrega o JSON com os dados dos locais
          fetch("../ongs.json")
          .then(response => response.json())
          .then(data => {
            // Para cada item no JSON, cria um marcador no mapa
            data.forEach(item => {
              const nome = item.nome;
              const lat = item.latitude;
              const lng = item.longitude;
              const endereco = item.endereco;
              const href = item.href;
              const latLng = new google.maps.LatLng(lat, lng);

              const marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: pinImage,
                title: nome,
                address: endereco,
              });

              // Adiciona um evento de clique para mostrar as informações do local
              marker.addListener("click", function () {
                infoWindow.setContent(
                  "<h3>" + nome + "</h3><p>" + endereco + "</p><a style='outline: none;' href='" + href +".html' >Ver perfil</a>"
                );
                infoWindow.open(map, marker);
              });
            });
          })
          .catch(error => {
            console.error("Erro ao carregar os dados JSON:", error);
          });
          
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// Verifica se a API do Google Maps foi carregada
if (typeof google !== 'undefined') {
  // Se a API estiver carregada, você pode chamar sua função initMap
  initMap();
} else {
  // Se a API não estiver carregada, você pode adicionar um ouvinte de eventos para quando ela for carregada
  window.addEventListener('load', initMap);
}