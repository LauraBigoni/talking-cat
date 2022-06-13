// console.log('JS OK!');

// * Elementi dal DOM
const textArea = document.querySelector('textarea');
const playButton = document.querySelector('button');
const pitchBar = document.querySelector('input');
const catFigure = document.querySelector('figure');

// * Prendo le voci del sintetizzatore vocale
let voices = [];
speechSynthesis.addEventListener('voiceschanged', function () {
  voices = speechSynthesis.getVoices();
  // console.log(voices);
});

// * Aggiungo un Event Listener al button
playButton.addEventListener('click', function () {

  // * Controllo che non ci siano spazi vuoti nel valore
  const textLength = textArea.value.trim().length;

  // * Se non ci sono
  if (textLength > 0) {
    // * Il gattino parla
    talk();
  }
});

// * Funzione per far parlare il gattino
function talk() {

  // * Tono di voce e testo
  const text = textArea.value;
  const pitch = pitchBar.value;
  // console.log(text, pitch);
  // * Preparo il sintetizzatore vocale e gli passo la frase dalla textarea
  const utterance = new SpeechSynthesisUtterance(text);

  // * Dettagli vocali per la frase
  utterance.volume = 1;
  utterance.rate = 1;
  utterance.pitch = pitch;

  // * Scelgo una voce dall'elenco delle voci
  const voiceChoosen = voices.find(function (voice) {
    if (voice.name.includes('Google italiano')) {
      return true;
    }
  });
  // console.log(voiceChoosen);

  // * Imposto la voce del sintetizzatore appena scelta
  utterance.voice = voiceChoosen;

  // * Il gattino parla
  speechSynthesis.speak(utterance);

  // * Disabilito input textarea e button mentre il gattino parla
  utterance.addEventListener('start', function () {
    // *Blocco i controlli
    textArea.disabled = true;
    pitchBar.disabled = true;
    playButton.disabled = true;

    // * Imposto il gattino animata sullo schermo
    catFigure.classList.add('talking');
  });

  // * Abilito input textarea e button quando il gattino ha finito
  utterance.addEventListener('end', function () {
    // * Sblocco i controlli
    textArea.disabled = false;
    pitchBar.disabled = false;
    playButton.disabled = false;

    // * Reimposto il gattino statico sullo schermo
    catFigure.classList.remove('talking');
  });
}
