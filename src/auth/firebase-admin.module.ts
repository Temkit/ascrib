// firebase-admin.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
const serviceAccount = {
  type: 'service_account',
  project_id: 'qualidev-9675f',
  private_key_id: '14b3f39a1f1fafc114cae79aeda41a0a06c00fec',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxw03TOnWfM4ws\npx83H+SODMKONedbym1T+qIace4qk0rw/+Xjz2L4JLDVfy7IrhtbX7NmuBzj1dMd\ni9TY2gYku3921+hx49aCOUwDwzlsUnqk1797P3raFyAy5/qq97To1cCU6Pd0U1l9\nZXiKObKChXbyYfD9PnrRbtPzoL5wcIlvM33dRBCHajW0ebvngOZNDRobhsqJTBJq\neDbYVnnEhUveWnxH0Ej7DGup9UQlHN4yw9PvhiacH5BgUKb0CI0q6vd8Lf8ymog+\nCI6xmCBLrk/LoGEcFvbDq6G4uD9u11e3Qo6XC9U9DhfgrNztI7Vvz33bH01i3JsS\nQ0HafpLDAgMBAAECggEABBXYeokb6JTp3PbZn/iIK1Q+E8BHuRN9uryGWt7mby0O\nalvUio1FbtgtBjho41d5AnsVvOpwo4h8/xoBF3C/S7smvUejVxwPiH5M8cMxVSd6\nG8K86wC0+pZ7I3WzDEMqxwpukB2LM62yCfs52iIO/l1B3rqDLCwc7NDuvGkj0fgC\nVQ0GkrEjIRbjYslItK5qKxA0eCPFzCC91TlDAvLu1rrGOnylsiwC6cbamt+iEL+c\nM7TDmVWLpTgus/vSlU04lWN8PZxI2A/SYpJwixckCy1rIiHzyjWl3RgECf27iJQn\nRsWI5AbU9sAlQ8vcabD3EgDhOQ8XYIav4a/dIHZ3LQKBgQDWQqgBiHWrLnonIgfH\nQHhITc9aYOK+k6J6Kb56RMs62lNToElu8Iz+zzu4VS+nI/rGqfEtuVlcmGcSVYyL\n8F6w0lPqZROmeNQG5OIKa58W/PPWlQkWUElZ7U0h8OXM0NLXvLJ2vJgeCiJ0UGo1\njLHIo2Ma8FD3kKyoZdaehfxDTwKBgQDUZH0LsMegp/EGNsZ1m3vTB9/dTTJvEVxS\nmajI63vCEvfgSgrJ83TZZ7Y749gtshF4yY7dfbw3mUsaU+BPD14wF+CRkF7odazS\nIR6CM0X7D6X/BqU+ImJSdrKcVYA1F7YOVvG2T0Rhk+WaOaPsxXu9GXvmZdZyqtQu\nU0qI0PdsTQKBgQC8Xun6PxDEqR333bFc+k9FsjME0H1I89867AxszqKmYWA0+4zU\nHmS3eVaV3z8AAV/u3WYOvw/TmqGzusbQGUoGx0PDpY27JCu0y/H3G1tJCKcQFwNg\nPMHgcAMKPhKrGUTlKx7zyScr8dkMzc4yujlrnkn5WyK0JNvHSZGA2WdJfQKBgBhA\nPRLnpXOPmXKnMHPfQ/0tif8fwGF0LwFzcBU45hGbzte6PI8gkDf+oo0mD9nv2hTb\nlsdtgt8qTqv75cHBNHTzVP3p6RxLy2bWx0AAkL4A5GhBHv8AOA/IY8576L6nLW9n\nuAOj+1/U3kOEz1XKmr1VupLtD9ZZ8Q41Dm6exZGFAoGAJoRSE/tuGCh0Vkxj3dlD\nnp+kzaHoMP0SypZudUJrSQTen479fNKoYk1uBHAR4hznxzdLmp4epT8OfjdYwaHI\n/4cKbEb6tEo6rpqFt58nwnZ3MDp1uI8eqJpOL3AetUbLA9DpjHpbMVxsMNMJZv3F\nXHV/WSteb+L8KUsGzq1GB9g=\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-19zwv@qualidev-9675f.iam.gserviceaccount.com',
  client_id: '104501042412336032426',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-19zwv%40qualidev-9675f.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};
@Module({})
export class FirebaseAdminModule implements OnModuleInit {
  onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    });
  }
}
