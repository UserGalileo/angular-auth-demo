# NgAuthPlayground (OIDC, Google, Implicit Flow)

## Istruzioni per l'uso
- Crea un nuovo progetto con la Google Cloud Console (https://console.cloud.google.com/apis/credentials)
- L'url dell'applicazione deve essere `localhost:4200`, mentre il Redurect URI dev'essere `localhost:4200/auth-callback`.
- Copia l'id del nuovo progetto (client id) dalla console e incolallo nella relativa proprietà nel file `/oauth/oauth-config.ts`

## Avvertenze
Questo progetto utilizza l'implicit flow (deprecato) perché è l'unico (ad oggi, Novembre 2022) messo a disposizione da Google per Client Pubblici.

Nel caso volessi utilizzare il nuovo Authorization Code with PKCE (*senza* Client Secret) con un provider che lo consenta (es. Microsoft), utilizza la nuova libreria `oidc-client-ts`. L'api è sostanzialmente identica a quella usata in questo progetto, ma il `response_type` da indicare nella configurazione sarà `code`, non più `token`.

Rimane valido il consiglio di *NON* utilizzare OAuth / OIDC nel browser (se possibile, ovviamente), ma di utilizzarlo via server con l'`Authorization Code Flow`, e per mantenere la sessione attiva usare un Cookie.

Volendo, se hai un server, puoi anche usare l'`Implicit Flow with Form Post` se il provider lo consente: non ha nulla a che vedere con l'Implicit Flow classico, e al posto di restituire l'Access Token, restituisce solamente l'ID Token (quindi è utile quando non si ha bisogno di accedere alle API del provider, ma soltanto verificare l'identità di un utente).
