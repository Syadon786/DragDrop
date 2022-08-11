/* State: Az állapotot mindig úgy érdemes létrehozni, hogy a 
legminimálisabb módon írja le a működéshez szükséges információkat. 
Jelen esetben ez a három kulcs-érték pár elegendő. */
let state = {
    x: undefined,
    y: undefined,
    isDragged: false,
  };
  

  const container = document.getElementById("drag-and-drop-app");
  state.x = container.offsetLeft;
  state.y = container.offsetTop;

  /*Ezt a függvényt már oldalletöltéskor le 
  kell futtatnunk, hogy a doboz kirajzolódjon a kiinduló helyzetében.*/
  window.onload = render;


  // 1. Renderelő függvény, ami megjeleníti a dobozt a state-ből kiolvasott adatok alapján
  function render() {
      /* 2. A dobozt úgy rajzoljuk ki, hogy az element-nek a position style attribútuma "absolute", a 
      left és a top attribútuma pedig a state-ből származó x és y érték*/
      const doboz = `
      <div
          style="width: 200px; position: absolute; left: ${state.x}px; top: ${state.y}px;"
          class="box ${state.isDragged ? "grabbed" : "not-grabbed"}"
          onmousedown="dobozDragStart()"
          onmouseup="dobozDragEnd()"
          onmousemove="dobozMouseMove(window.event)"
        >
        <div class="card-body">
          <h5 class="card-title display-4"># húzd arrébb</h5>
        </div>
      </div>
      `;

    document.getElementById("drag-and-drop-app").innerHTML = doboz;
  }


  // 3. A doboz mousedown eseményre reagálva módosítsuk a state isDragged értékét true-ra
  function dobozDragStart() {
    state.isDragged = true;
    render();
  }
  

  // 4. A doboz mouseup eseményre reagálva módosítsuk a state isDragged értékét false-ra
  function dobozDragEnd() {
    state.isDragged = false;
    render();
  }


  /* 5. A doboz mousemove eseménykor vizsgáljuk meg, hogy a state.isDragged értéke true-e
  Amennyiben igen, írjuk be a state x és y kulcsa alá az egér aktuális x,y pozícióját */
  function dobozMouseMove(event) {
    if(state.isDragged) {
      /*A "closest" függvény azt csinálja, hogy elkezd felfelé lépdelni az 
      element hierarchiában és közben azt az elementet keresi, ami egyezik a 
      bepasszolt selector értékével. Jelen esetben addig lépdel, amíg bele 
      nem ütközik a box classú elementbe és ezt az elementet adja vissza találatként.*/
      const box = event.target.closest(".box");
      if (!box) {
        return;
      }
      /*Elvégezhetjük a state módosítást, az event object-ből kinyert egér pozíció adataival, úgy hogy a 
      doboz közepét az egérhez visszük + scrollolás esetén is pontosítjuk.*/
      state.x = document.documentElement.scrollLeft + event.clientX - box.offsetWidth / 2;
      state.y = document.documentElement.scrollTop + event.clientY - box.offsetHeight / 2;
      render();
    }
  }
