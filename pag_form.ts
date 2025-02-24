/**
 * Tipi di dato per gestire i campi del Form
 */
type TForm = {
    nome: string | null,
    cognome: string | null,
    sesso: string | null,
    comuneNascita: string | null,
    dataNascita: string | null,
    codFiscale: string | null,
    email: string | null,
    password: string | null,
    indirizzo: string | null,
    comune: string | null,
    cap: number | null
}

type TUser = {
    nome: string | null,
    cognome: string | null,
    sesso: string | null,
    comuneNascita: string | null,
    dataNascita: string | null,
    codFiscale: string | null
}

type TCredenziali = {
    email: string | null,
    password: string | null
}

type TIndirizzo = {
    indirizzo: string | null,
    comune: string | null,
    cap: number | null
}

/**
 * Classe Utility con metodi static per validazioni
 */
class CControllaForm {

    // Utility generiche PROTECTED ---------------------------------------------

    // Ritorna il valore di un elemento o false (se è vuoto o indefinito)
    protected static raccogliDati(idTag: string): string | false {
        const el = (<HTMLInputElement>document.getElementById(idTag)).value
        return (el != undefined || el != null) ? el : false;
    }

    // Crea e posiziona un attributo
    protected static creaAttributo(id: string, att: string, value: string): void {
        var posA: HTMLElement | null = document.getElementById(id);
        if (posA != null) {
            posA.setAttribute(att, value)
        }
    }

    // Verifica se una stringa corta è valida
    protected static validazioneStringaShort(stringa: string): boolean {
        return (stringa.match("^[A-Za-z]{1,20}")) ? true : false;
    }

    // Verifica se una stringa lunga è valida
    protected static validazioneStringaLong(stringa: string): boolean {
        return (stringa.match("^[A-Za-z]{1,50}")) ? true : false;
    }

    // Verifica se il formato del CAP è valido
    protected static validaCap(stringa: string): boolean {
        return (stringa.match("^[0-9]{5}")) ? true : false;
    }

    // Verifica se l'indirizzo email è valido
    protected static validazioneEmail(email: string): boolean {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return (email.match(mailformat)) ? true : false;
    }


    // Metodi specifici PUBLIC --------------------------------------------

    /**
     * Funzione che controlla la PASSWORD segnalandone la robustezza
     * @param {HTMLInputElement} pssw Input type della password
     * @param {HTMLInputElement} al Div dove inserire il testo del messaggio
     * @param {HTMLInputElement} bar Div della progress bar
     * @returns {boolean}
     */
    public static controllaPassword(pssw: HTMLInputElement, al: HTMLInputElement, bar: HTMLInputElement): boolean {
        const password: string = pssw.value
        var x: number = 0
        var ok: boolean = false

        //controllo numeri
        var check1: RegExp = /[0-9]/
        if (check1.test(password)) {
            x = x + 20
        }
        //controllo minuscole
        var check2: RegExp = /[a-z]/
        if (check2.test(password)) {
            x = x + 20
        }
        //controllo maiuscole
        var check3: RegExp = /[A-Z]/
        if (check3.test(password)) {
            x = x + 20
        }
        //controllo simboli
        var check4: RegExp = /[$-/:-?{-~!"^_`\[\]]/
        if (check4.test(password)) {
            x = x + 20
        }
        // controllo lunghezza (minore o uguale a 10 caratteri)
        if (password.length >= 10) {
            x = x + 20
        }

        // risultato
        bar.style.width = x + "%"
        if (x == 100) {
            bar.style.backgroundColor = "green"
            al.innerHTML = "Ottima"
            ok = true
        }
        if (x == 80) {
            bar.style.backgroundColor = "green"
            al.innerHTML = "Buona"
        }
        if (x == 60) {
            bar.style.backgroundColor = "yellow"
            al.innerHTML = "Mediocre"
        }
        if (x <= 40) {
            bar.style.backgroundColor = "red"
            al.innerHTML = "Pessima"
        }

        if (password.length == 0) {
            x == 0
            al.innerHTML = ""
        }

        //controllo spazi bianchi
        var check5: RegExp = /\s\S/
        if (check5.test(password)) {
            al.innerHTML = "La password non può contenere spazi bianchi"
            bar.style.backgroundColor = "red"
            ok = false
        }

        return ok
    }

    /**
     * Funzione che valida il formato delle due password, le confronta e avvisa se diverse
     * @param {string} nomeCampo1 Nome della prima input password
     * @param {string} nomeCampo2 Nome della seconda input password
     * @param {string} label1 Label della prima input password
     * @param {string} label2 Label della seconda input password
     * @param {string} alertPassword ID del div dell'avviso
     * @returns boolean
     */
    public static validaPassword(nomeCampo1: string, nomeCampo2: string, label1: string, label2: string, alertPassword: string) {
        const password1: string | false = this.raccogliDati(nomeCampo1)
        const password2: string | false = this.raccogliDati(nomeCampo2)
        if (!(password1 == '') && (password1 != false)) {
            (<HTMLLabelElement>document.getElementById(label1)).removeAttribute('style')
            if (!(password2 == '') && (password2 != false)) {
                (<HTMLLabelElement>document.getElementById(label2)).removeAttribute('style')
                if (password1 == password2) {
                    return true
                } else {
                    this.creaAttributo(label1, 'style', 'color:red');
                    this.creaAttributo(label2, 'style', 'color:red');
                    (<HTMLElement>document.getElementById(alertPassword)).innerHTML = "Le password inserite sono diverse"
                    return false
                }
            } else {
                this.creaAttributo(label2, 'style', 'color:red')
                return false
            }
        } else {
            this.creaAttributo(label1, 'style', 'color:red')
            return false
        }
    }

    /**
     * Funzione che controlla il CODICE FISCALE
     * @param {string} cf Codice da verificare
     * @returns boolean | string
     */
    public static controllaCF(cf: string): string | boolean {
        var validi, i, s, set1, set2, setpari, setdisp
        if (cf == '') return false

        cf = cf.toUpperCase()
        if (cf.length != 16)
            return "Il codice fiscale dovrebbe essere lungo 16 caratteri."

        validi = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        for (i = 0; i < 16; i++) {
            if (validi.indexOf(cf.charAt(i)) == -1)
                return "Il codice fiscale contiene un carattere non valido `" +
                    cf.charAt(i) + "'. I caratteri validi sono le lettere e le cifre."
        }

        set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ"
        setpari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        setdisp = "BAKPLCQDREVOSFTGUHMINJWZYX"
        s = 0

        for (i = 1; i <= 13; i += 2)
            s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))))

        for (i = 0; i <= 14; i += 2)
            s += setdisp.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))))

        if (s % 26 != cf.charCodeAt(15) - 'A'.charCodeAt(0))
            return "Il codice fiscale non è corretto!"
        return true
    }

    /**
     * Funzione che verifica il codice fiscale, evidenzia la label e invia un messaggio di errore
     * @param {string} idTag Id dell'input type
     * @param {string} label Label dell'input type
     * @param {string} idMessage ID del div dell'avviso
     * @returns boolean
     */
    // 
    public static validaCF(idTag: string, label: string, idMessage: string): boolean {
        const codFiscale = this.raccogliDati(idTag)
        if (typeof codFiscale == 'string') {
            const cf = this.controllaCF(codFiscale)
            const msg = (<HTMLElement>document.getElementById(idMessage))
            if (typeof cf == 'string') {
                this.creaAttributo(label, 'style', 'color:red')
                this.creaAttributo(idTag, 'placeholder', 'Inserisci qui')
                msg.innerHTML = cf
                return false
            } else if (!cf) {
                this.creaAttributo(label, 'style', 'color:red')
                msg.innerHTML = ''
                return false
            } else {
                (<HTMLLabelElement>document.getElementById(label)).removeAttribute('style')
                msg.innerHTML = ''
                return true
            }
        } return false

    }

    /**
     * Funzione che verifica se è stata selezionata una select ed evidenzia la label
     * @param {HTMLInputElement} radio Input radio
     * @param {string} label Label dell'input radio
     * @returns boolean
     */
    public static validaSel(radio: HTMLInputElement, label: string) {
        if (radio.value == 'maschio' || radio.value == 'femmina') {
            (<HTMLLabelElement>document.getElementById(label)).removeAttribute('style')
            return true
        } else {
            this.creaAttributo(label, 'style', 'color:red')
            return false
        }
    }

    /**
     * Funzione che verifica se è stata selezionata una data ed evidenzia la label
     * @param {string} nomeCampo Nome dell'input type
     * @param {string} label Label dell'input type
     * @returns boolean
     */
    public static validaData(nomeCampo: string, label: string) {
        const campo = this.raccogliDati(nomeCampo);
        if (!campo || campo == "") {
            this.creaAttributo(label, 'style', 'color:red')
            return false
        } else {
            (<HTMLLabelElement>document.getElementById(label)).removeAttribute('style')
            return true
        }
    }

    /**
     * Funzione che verifica se la checkbox è stata spuntata e la evidenzia
     * @param {string} idTag Id della checkbox
     * @param {string} label Label della checkbox
     * @returns boolean
     */
    public static validaCheck(idTag: string, label: string) {
        if (!(<HTMLInputElement>document.getElementById(idTag)).checked) {
            this.creaAttributo(label, 'style', 'color:red')
            this.creaAttributo(idTag, 'style', 'color:red')
            return false
        } else {
            (<HTMLLabelElement>document.getElementById(label)).removeAttribute('style')
            return true
        }
    }

    /**
     * Funzione che evidenzia con lo style campi non compilati correttamente
     * @param {string} nomeCampo Input type
     * @param {string} label Label dell'input type
     * @param {function} validazione Funzione di tipo validazione
     * @returns boolean
     */
    public static validaStyle(nomeCampo: string, label: string, validazione: typeof CControllaForm.arguments) {
        const campo = this.raccogliDati(nomeCampo);
        var correct = true
        if (!campo) {
            this.creaAttributo(label, 'style', 'color:red')
            this.creaAttributo(nomeCampo, 'placeholder', 'Inserisci qui')
            correct = false
        } else {
            if (!validazione(campo)) {
                this.creaAttributo(label, 'style', 'color:red')
                correct = false
            } else {
                (<HTMLLabelElement>document.getElementById(label)).removeAttribute('style')
            }
        }
        return correct
    }

}


/**
 * Classe FORM per gestire i dati suddividendoli in base alle api
 */
class CForm {
    //Costruttore
    constructor(form: TForm) {
        this.setForm(form)
    }

    //Proprietà

    private utente: TUser = {
        nome: null,
        cognome: null,
        sesso: null,
        comuneNascita: null,
        dataNascita: null,
        codFiscale: null
    }

    private credenziali: TCredenziali = {
        email: null,
        password: null
    }

    private indirizzo: TIndirizzo = {
        indirizzo: null,
        comune: null,
        cap: null
    }

    //Metodi privati
    private setForm(form: TForm): void {
        this.setUtente(form)
        this.setCredenziali(form)
        this.setIndirizzo(form)
    }

    private setUtente(form: TForm) {
        this.utente = {
            nome: form.nome,
            cognome: form.cognome,
            sesso: form.sesso,
            comuneNascita: form.comuneNascita,
            dataNascita: form.dataNascita,
            codFiscale: form.codFiscale
        }
    }

    private setCredenziali(form: TForm) {
        this.credenziali = {
            email: form.email,
            password: form.password
        }
    }

    private setIndirizzo(form: TForm) {
        this.indirizzo = {
            indirizzo: form.indirizzo,
            comune: form.comune,
            cap: form.cap
        }
    }

    //Metodi pubblici
    public getUtente(): TUser {
        return this.utente
    }

    public getCredenziali(): TCredenziali {
        return this.credenziali
    }

    public getIndirizzo(): TIndirizzo {
        return this.indirizzo
    }
}