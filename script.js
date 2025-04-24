
const map = L.map('map').setView([37.2296, -80.4244], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const icons = {
  academic: L.icon({ iconUrl: 'Images/Virginia-Images/academic.png', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] }),
  dorm: L.icon({ iconUrl: 'Images/Virginia-Images/dorm.png', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] }),
  dining: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/5787/5787982.png', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] }),
  admin: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/685/685262.png', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] })
};

const buildings = [
  //dorms
  { name: 'West Ambler Johnston Hall', lat: 37.223066727509604, lng: -80.42090307186976, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'East Eggleston Hall', lat: 37.227765289027865,  lng: -80.41929815141087, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'Johnson Hall', lat: 37.225645625317995,  lng: -80.41765510921543, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'Vawter Hall', lat: 37.22701830244507,  lng:-80.41761318476634 , description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'Miles Hall', lat: 37.22555627529684,  lng: -80.41691737275275, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'East Ambler Johnston Hall', lat: 37.223226111914876,  lng: -80.42057508343552, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'Slusher Hall', lat: 37.225565430227874,  lng: -80.42098644294008, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'Cochrane Hall', lat: 37.222975256440954,  lng: -80.42215863390041, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'Payne Hall', lat: 37.22584734101497,   lng: -80.42002447420631, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'East Campbell', lat: 37.22630884762055,   lng: -80.42149071328302, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'Main Campbell', lat: 37.22616103727835,   lng: -80.42195778831773, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'Cochrane Hall', lat: 37.222975256440954,  lng: -80.42215863390041, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'Prichard Hall', lat: 37.22431366271656, lng: -80.4197782984045, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: ' OShaughnessy Hall', lat: 37.22535669043357,  lng: -80.41826778025533, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'New Hall West', lat: 37.2220981275908, lng: -80.42280320332495, description: 'Dormitory', type: 'dorm', image: 'images/torgersen.jpg'},
  { name: 'Hoge Hall', lat: 37.22464979016949, lng: -80.41814712426391, description: 'Dormitory', type: 'dorm' },
  //Academic Buildings
  { name: 'Torgersen Hall', lat: 37.22986122351267, lng: -80.42010410908762, description: 'Home of the Computer Science department.', type: 'academic', image: 'Images/torg.jpg' },
  { name: 'Goodwin Hall', lat: 37.2325288626481, lng: -80.42538163693267, description: 'College of Engineering, general labs and classrooms.', type: 'academic' },
  { name: 'Pamplin Hall College of Business', lat: 37.22867861775722,  lng: -80.42480667816986, description: 'College of Engineering, general labs and classrooms.', type: 'academic' },
  { name: 'Data and Decision Sciences', lat: 37.23172859362355,  lng: -80.42733179669237, description: 'College of Engineering, general labs and classrooms.', type: 'academic' },
  { name: 'Goodwin Hall', lat: 37.2325288626481, lng: -80.42538163693267, description: 'College of Engineering, general labs and classrooms.', type: 'academic' },
  { name: 'Goodwin Hall', lat: 37.2325288626481, lng: -80.42538163693267, description: 'College of Engineering, general labs and classrooms.', type: 'academic' },





  { name: 'Burruss Hall', lat: 37.22918268044685, lng: -80.42356395549267, description: 'Administrative building and auditorium.', type: 'admin' },
  { name: 'Turner Place Dining', lat: 37.2254, lng: -80.4222, description: 'Popular dining location near the engineering buildings.', type: 'dining' }
];

const markers = [];
let routingControl = null;

function displayLandmarksAlongRoute(routeLine) {
  const container = document.getElementById("landmarkPreview");
  const cards = document.getElementById("landmarkCards");
  cards.innerHTML = '';
  const threshold = 100; // meters

  const landmarks = buildings.filter(b => {
    const latLng = L.latLng(b.lat, b.lng);
    return routeLine.getLatLngs().some(p => latLng.distanceTo(p) < threshold);
  });

  if (landmarks.length > 0) {
    container.style.display = 'block';
    landmarks.forEach(b => {
      cards.innerHTML += `
        <div class="landmark-card">
          <img src="${b.image || 'images/placeholder.jpg'}" alt="${b.name}" />
          <strong>${b.name}</strong>
          <p style="font-size: 0.85rem;">${b.description}</p>
        </div>`;
    });
  } else {
    container.style.display = 'none';
  }
}

buildings.forEach(b => {
  const marker = L.marker([b.lat, b.lng], { icon: icons[b.type] })
    .bindPopup(`<strong>${b.name}</strong><br>${b.description}<br>
    <img src="${b.image || 'images/placeholder.jpg'}" alt="${b.name}" style="width: 100%; max-width: 250px; border-radius: 8px; margin-top: 0.5rem;" />`);
  marker.buildingType = b.type;
  marker.name = b.name.toLowerCase();
  marker.addTo(map);
  markers.push(marker);

  const option = `<option value="${b.lat},${b.lng}">${b.name}</option>`;
  document.getElementById('fromSelect').insertAdjacentHTML('beforeend', option);
  document.getElementById('toSelect').insertAdjacentHTML('beforeend', option);
});

function calculateRoute() {
  const from = document.getElementById('fromSelect').value;
  const to = document.getElementById('toSelect').value;
  if (!from || !to || from === to) return;
  const [fromLat, fromLng] = from.split(',').map(Number);
  const [toLat, toLng] = to.split(',').map(Number);
  if (routingControl) map.removeControl(routingControl);

  routingControl = L.Routing.control({
    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1', profile: 'pedestrian' }),
    waypoints: [L.latLng(fromLat, fromLng), L.latLng(toLat, toLng)],
    routeWhileDragging: false,
    show: true,
    collapsible: true,
    lineOptions: {
      styles: [{ color: '#e44608', opacity: 0.9, weight: 6 }]
    },
    createMarker: () => null,
    formatter: new L.Routing.Formatter({ language: 'en', units: 'imperial' })
  })
  .on('routesfound', function (e) {
    const routeLine = L.polyline(e.routes[0].coordinates);
    displayLandmarksAlongRoute(routeLine);
  })
  .addTo(map);
}

function clearRoute() {
  if (routingControl) {
    map.removeControl(routingControl);
    routingControl = null;
    document.getElementById("landmarkCards").innerHTML = "";
    document.getElementById("landmarkPreview").style.display = "none";
  }
}

document.getElementById('searchInput').addEventListener('input', function (e) {
  const search = e.target.value.toLowerCase();
  markers.forEach(m => {
    if (m.name.includes(search)) {
      map.setView(m.getLatLng(), 18);
      m.openPopup();
    }
  });
});

document.getElementById('filterType').addEventListener('change', function (e) {
  const type = e.target.value;
  markers.forEach(m => {
    if (type === 'all' || m.buildingType === type) {
      if (!map.hasLayer(m)) map.addLayer(m);
    } else {
      if (map.hasLayer(m)) map.removeLayer(m);
    }
  });
});
