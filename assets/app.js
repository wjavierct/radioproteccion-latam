function inverseSquare(rate, initial, final) {
  if (![rate, initial, final].every(Number.isFinite) || rate < 0 || initial <= 0 || final <= 0) throw new Error('Introduce una tasa finita mayor o igual a cero y distancias finitas mayores que cero.');
  const factor = (initial / final) ** 2;
  const result = rate === 0 ? 0 : rate * factor;
  if (!Number.isFinite(factor) || factor === 0 || !Number.isFinite(result) || (rate > 0 && result === 0)) throw new Error('Los valores exceden el rango numérico de esta herramienta. Usa valores menos extremos.');
  return { result, factor };
}
if (typeof module !== 'undefined') module.exports = { inverseSquare };
if (typeof document !== 'undefined') {
  const byId = id => document.getElementById(id);
  const format = n => n !== 0 && (Math.abs(n) < 0.00001 || Math.abs(n) >= 1e8) ? n.toExponential(5).replace('.', ',') : new Intl.NumberFormat('es', {maximumSignificantDigits: 7}).format(n);
  function calculate(event) {
    if (event) event.preventDefault();
    try {
      const rate = byId('rate').valueAsNumber, initial = byId('initial').valueAsNumber, final = byId('final').valueAsNumber;
      const {result, factor} = inverseSquare(rate, initial, final);
      const unit = byId('unit').value;
      byId('error').textContent = '';
      byId('value').textContent = format(result) + ' ' + unit;
      byId('substitution').textContent = format(rate) + ' × (' + format(initial) + ' / ' + format(final) + ')² = ' + format(result) + ' ' + unit;
      byId('explanation').textContent = rate === 0 ? 'Con una tasa inicial de cero, el modelo da cero en ambas posiciones.' : factor === 1 ? 'La distancia no cambia: la tasa se mantiene.' : factor < 1 ? 'Al aumentar la distancia de ' + format(initial) + ' m a ' + format(final) + ' m, la tasa queda en el ' + format(factor * 100) + ' % de la inicial (reducción del ' + format((1 - factor) * 100) + ' %).' : 'Al reducir la distancia de ' + format(initial) + ' m a ' + format(final) + ' m, la tasa aumenta por un factor de ' + format(factor) + '.';
    } catch (error) {
      byId('error').textContent = error.message;
      byId('value').textContent = 'Sin resultado';
      byId('substitution').textContent = '';
      byId('explanation').textContent = 'Revisa los datos y vuelve a calcular.';
    }
  }
  byId('calculator').addEventListener('submit', calculate);
  function clearResult() {
    byId('error').textContent = '';
    byId('value').textContent = 'Pendiente de cálculo';
    byId('substitution').textContent = '';
    byId('explanation').textContent = 'Pulsa «Calcular tasa de dosis» para obtener el resultado.';
  }
  byId('calculator').addEventListener('input', clearResult);
  byId('calculator').addEventListener('change', clearResult);
  byId('example').addEventListener('click', () => {
    byId('rate').value = '0.8'; byId('initial').value = '1'; byId('final').value = '2'; byId('unit').value = 'mSv/h';
    clearResult(); location.hash = 'calculadoras'; byId('rate').focus({preventScroll:true});
  });
  byId('menu').addEventListener('click', () => {
    const open = byId('nav').classList.toggle('open'); byId('menu').setAttribute('aria-expanded', String(open));
  });
  byId('nav').addEventListener('click', event => {
    if (event.target.closest('a')) { byId('nav').classList.remove('open'); byId('menu').setAttribute('aria-expanded', 'false'); }
  });
  clearResult();
}
