// Adaptador local: hace que el tablero funcione como sitio web estático (GitHub Pages).
// Lee los CSV que exporta la sección 8 del notebook 01 desde la carpeta data/.
(function () {
  const ARCHIVOS = {
    volumen: 'volumen_departamento.csv',
    capas: 'capas.csv',
    intervalos: 'intervalos.csv',
    dias_secos_mes: 'dias_secos_mes.csv',
    metricas_diaria: 'metricas_diaria.csv',
    metricas_semanal: 'metricas_semanal.csv',
    auc_departamento: 'auc_departamento.csv',
    mae_departamento: 'mae_departamento.csv',
    auc_horizonte: 'auc_horizonte.csv',
    estaciones_utiles: 'estaciones_utiles.csv',
    pronostico: 'pronostico_semana.csv',
    verificacion: 'verificacion_semanas.csv'
  };
  const PARAMETROS_INICIALES = { depto: null, mes: new Date().getMonth() + 1 };

  const datos = {};
  const calculos = {};
  const oyentes = [];
  let parametros = { ...PARAMETROS_INICIALES };
  let pendiente = false;

  function avisar() {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      oyentes.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });
    });
  }

  function cargar(id) {
    if (datos[id]) return;
    datos[id] = { status: 'loading', data: [], columns: [] };
    d3.csv(`data/${ARCHIVOS[id]}?v=${Date.now()}`)
      .then(filas => { datos[id] = { status: 'ok', data: filas, columns: filas.columns }; avisar(); })
      .catch(() => { datos[id] = { status: 'missing', data: [], columns: [] }; avisar(); });
  }

  function calcular(id) {
    const c = calculos[id];
    const entradas = c.inputs.map(i => window.dash.data(i));
    const noLista = entradas.find(e => e.status !== 'ok');
    if (noLista) return { status: noLista.status, data: [] };
    try { return { status: 'ok', data: c.fn(...entradas.map(e => e.data)) }; }
    catch (e) { console.error(e); return { status: 'error', data: [] }; }
  }

  window.dash = {
    data(id) {
      if (calculos[id]) return calcular(id);
      if (!ARCHIVOS[id]) return { status: 'missing', data: [], columns: [] };
      cargar(id);
      return datos[id];
    },
    calc(id, def) { calculos[id] = def; },
    onData(fn) { oyentes.push(fn); try { fn(); } catch (e) { console.error(e); } },
    params() { return { ...parametros }; },
    setParams(p) { Object.assign(parametros, p); avisar(); },
    resetParams() { parametros = { ...PARAMETROS_INICIALES }; avisar(); },
    setLink(nombre) { history.replaceState(null, '', `#${nombre}`); },
    refresh() {},
    colors: ['var(--cds-chart-categorical-1)', 'var(--cds-chart-categorical-2)']
  };
  window.addEventListener('resize', avisar);
})();
