/**
 * Classe Utility con metodi static per validazioni
 */
var CControllaForm = /** @class */ (function () {
    function CControllaForm() {
    }
    // Utility generiche PROTECTED ---------------------------------------------
    // Ritorna il valore di un elemento o false (se è vuoto o indefinito)
    CControllaForm.raccogliDati = function (idTag) {
        var el = document.getElementById(idTag).value;
        return (el != undefined || el != null) ? el : false;
    };
    // Crea e posiziona un attributo
    CControllaForm.creaAttributo = function (id, att, value) {
        var posA = document.getElementById(id);
        if (posA != null) {
            posA.setAttribute(att, value);
        }
    };
    // Verifica se una stringa corta è valida
    CControllaForm.validazioneStringaShort = function (stringa) {
        return (stringa.match("^[A-Za-z]{1,20}")) ? true : false;
    };
    // Verifica se una stringa lunga è valida
    CControllaForm.validazioneStringaLong = function (stringa) {
        return (stringa.match("^[A-Za-z]{1,50}")) ? true : false;
    };
    // Verifica se il formato del CAP è valido
    CControllaForm.validaCap = function (stringa) {
        return (stringa.match("^[0-9]{5}")) ? true : false;
    };
    // Verifica se l'indirizzo email è valido
    CControllaForm.validazioneEmail = function (email) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return (email.match(mailformat)) ? true : false;
    };
    // Metodi specifici PUBLIC --------------------------------------------
    /**
     * Funzione che controlla la PASSWORD segnalandone la robustezza
     * @param {HTMLInputElement} pssw Input type della password
     * @param {HTMLInputElement} al Div dove inserire il testo del messaggio
     * @param {HTMLInputElement} bar Div della progress bar
     * @returns {boolean}
     */
    CControllaForm.controllaPassword = function (pssw, al, bar) {
        var password = pssw.value;
        var x = 0;
        var ok = false;
        //controllo numeri
        var check1 = /[0-9]/;
        if (check1.test(password)) {
            x = x + 20;
        }
        //controllo minuscole
        var check2 = /[a-z]/;
        if (check2.test(password)) {
            x = x + 20;
        }
        //controllo maiuscole
        var check3 = /[A-Z]/;
        if (check3.test(password)) {
            x = x + 20;
        }
        //controllo simboli
        var check4 = /[$-/:-?{-~!"^_`\[\]]/;
        if (check4.test(password)) {
            x = x + 20;
        }
        // controllo lunghezza (minore o uguale a 10 caratteri)
        if (password.length >= 10) {
            x = x + 20;
        }
        // risultato
        bar.style.width = x + "%";
        if (x == 100) {
            bar.style.backgroundColor = "green";
            al.innerHTML = "Ottima";
            ok = true;
        }
        if (x == 80) {
            bar.style.backgroundColor = "green";
            al.innerHTML = "Buona";
        }
        if (x == 60) {
            bar.style.backgroundColor = "yellow";
            al.innerHTML = "Mediocre";
        }
        if (x <= 40) {
            bar.style.backgroundColor = "red";
            al.innerHTML = "Pessima";
        }
        if (password.length == 0) {
            x == 0;
            al.innerHTML = "";
        }
        //controllo spazi bianchi
        var check5 = /\s\S/;
        if (check5.test(password)) {
            al.innerHTML = "La password non può contenere spazi bianchi";
            bar.style.backgroundColor = "red";
            ok = false;
        }
        return ok;
    };
    /**
     * Funzione che valida il formato delle due password, le confronta e avvisa se diverse
     * @param {string} nomeCampo1 Nome della prima input password
     * @param {string} nomeCampo2 Nome della seconda input password
     * @param {string} label1 Label della prima input password
     * @param {string} label2 Label della seconda input password
     * @param {string} alertPassword ID del div dell'avviso
     * @returns boolean
     */
    CControllaForm.validaPassword = function (nomeCampo1, nomeCampo2, label1, label2, alertPassword) {
        var password1 = this.raccogliDati(nomeCampo1);
        var password2 = this.raccogliDati(nomeCampo2);
        if (!(password1 == '') && (password1 != false)) {
            document.getElementById(label1).removeAttribute('style');
            if (!(password2 == '') && (password2 != false)) {
                document.getElementById(label2).removeAttribute('style');
                if (password1 == password2) {
                    return true;
                }
                else {
                    this.creaAttributo(label1, 'style', 'color:red');
                    this.creaAttributo(label2, 'style', 'color:red');
                    document.getElementById(alertPassword).innerHTML = "Le password inserite sono diverse";
                    return false;
                }
            }
            else {
                this.creaAttributo(label2, 'style', 'color:red');
                return false;
            }
        }
        else {
            this.creaAttributo(label1, 'style', 'color:red');
            return false;
        }
    };
    /**
     * Funzione che controlla il CODICE FISCALE
     * @param {string} cf Codice da verificare
     * @returns boolean | string
     */
    CControllaForm.controllaCF = function (cf) {
        var validi, i, s, set1, set2, setpari, setdisp;
        if (cf == '')
            return false;
        cf = cf.toUpperCase();
        if (cf.length != 16)
            return "Il codice fiscale dovrebbe essere lungo 16 caratteri.";
        validi = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (i = 0; i < 16; i++) {
            if (validi.indexOf(cf.charAt(i)) == -1)
                return "Il codice fiscale contiene un carattere non valido `" +
                    cf.charAt(i) + "'. I caratteri validi sono le lettere e le cifre.";
        }
        set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ";
        setpari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        setdisp = "BAKPLCQDREVOSFTGUHMINJWZYX";
        s = 0;
        for (i = 1; i <= 13; i += 2)
            s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
        for (i = 0; i <= 14; i += 2)
            s += setdisp.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
        if (s % 26 != cf.charCodeAt(15) - 'A'.charCodeAt(0))
            return "Il codice fiscale non è corretto!";
        return true;
    };
    /**
     * Funzione che verifica il codice fiscale, evidenzia la label e invia un messaggio di errore
     * @param {string} idTag Id dell'input type
     * @param {string} label Label dell'input type
     * @param {string} idMessage ID del div dell'avviso
     * @returns boolean
     */
    // 
    CControllaForm.validaCF = function (idTag, label, idMessage) {
        var codFiscale = this.raccogliDati(idTag);
        if (typeof codFiscale == 'string') {
            var cf = this.controllaCF(codFiscale);
            var msg = document.getElementById(idMessage);
            if (typeof cf == 'string') {
                this.creaAttributo(label, 'style', 'color:red');
                this.creaAttributo(idTag, 'placeholder', 'Inserisci qui');
                msg.innerHTML = cf;
                return false;
            }
            else if (!cf) {
                this.creaAttributo(label, 'style', 'color:red');
                msg.innerHTML = '';
                return false;
            }
            else {
                document.getElementById(label).removeAttribute('style');
                msg.innerHTML = '';
                return true;
            }
        }
        return false;
    };
    /**
     * Funzione che verifica se è stata selezionata una select ed evidenzia la label
     * @param {HTMLInputElement} radio Input radio
     * @param {string} label Label dell'input radio
     * @returns boolean
     */
    CControllaForm.validaSel = function (radio, label) {
        if (radio.value == 'maschio' || radio.value == 'femmina') {
            document.getElementById(label).removeAttribute('style');
            return true;
        }
        else {
            this.creaAttributo(label, 'style', 'color:red');
            return false;
        }
    };
    /**
     * Funzione che verifica se è stata selezionata una data ed evidenzia la label
     * @param {string} nomeCampo Nome dell'input type
     * @param {string} label Label dell'input type
     * @returns boolean
     */
    CControllaForm.validaData = function (nomeCampo, label) {
        var campo = this.raccogliDati(nomeCampo);
        if (!campo || campo == "") {
            this.creaAttributo(label, 'style', 'color:red');
            return false;
        }
        else {
            document.getElementById(label).removeAttribute('style');
            return true;
        }
    };
    /**
     * Funzione che verifica se la checkbox è stata spuntata e la evidenzia
     * @param {string} idTag Id della checkbox
     * @param {string} label Label della checkbox
     * @returns boolean
     */
    CControllaForm.validaCheck = function (idTag, label) {
        if (!document.getElementById(idTag).checked) {
            this.creaAttributo(label, 'style', 'color:red');
            this.creaAttributo(idTag, 'style', 'color:red');
            return false;
        }
        else {
            document.getElementById(label).removeAttribute('style');
            return true;
        }
    };
    /**
     * Funzione che evidenzia con lo style campi non compilati correttamente
     * @param {string} nomeCampo Input type
     * @param {string} label Label dell'input type
     * @param {function} validazione Funzione di tipo validazione
     * @returns boolean
     */
    CControllaForm.validaStyle = function (nomeCampo, label, validazione) {
        var campo = this.raccogliDati(nomeCampo);
        var correct = true;
        if (!campo) {
            this.creaAttributo(label, 'style', 'color:red');
            this.creaAttributo(nomeCampo, 'placeholder', 'Inserisci qui');
            correct = false;
        }
        else {
            if (!validazione(campo)) {
                this.creaAttributo(label, 'style', 'color:red');
                correct = false;
            }
            else {
                document.getElementById(label).removeAttribute('style');
            }
        }
        return correct;
    };
    return CControllaForm;
}());
/**
 * Classe FORM per gestire i dati suddividendoli in base alle api
 */
var CForm = /** @class */ (function () {
    //Costruttore
    function CForm(form) {
        //Proprietà
        this.utente = {
            nome: null,
            cognome: null,
            sesso: null,
            comuneNascita: null,
            dataNascita: null,
            codFiscale: null
        };
        this.credenziali = {
            email: null,
            password: null
        };
        this.indirizzo = {
            indirizzo: null,
            comune: null,
            cap: null
        };
        this.setForm(form);
    }
    //Metodi privati
    CForm.prototype.setForm = function (form) {
        this.setUtente(form);
        this.setCredenziali(form);
        this.setIndirizzo(form);
    };
    CForm.prototype.setUtente = function (form) {
        this.utente = {
            nome: form.nome,
            cognome: form.cognome,
            sesso: form.sesso,
            comuneNascita: form.comuneNascita,
            dataNascita: form.dataNascita,
            codFiscale: form.codFiscale
        };
    };
    CForm.prototype.setCredenziali = function (form) {
        this.credenziali = {
            email: form.email,
            password: form.password
        };
    };
    CForm.prototype.setIndirizzo = function (form) {
        this.indirizzo = {
            indirizzo: form.indirizzo,
            comune: form.comune,
            cap: form.cap
        };
    };
    //Metodi pubblici
    CForm.prototype.getUtente = function () {
        return this.utente;
    };
    CForm.prototype.getCredenziali = function () {
        return this.credenziali;
    };
    CForm.prototype.getIndirizzo = function () {
        return this.indirizzo;
    };
    return CForm;
}());
