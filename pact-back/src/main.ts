import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'
import pact from '@pact-foundation/pact-node';
const Verifier = require("@pact-foundation/pact").Verifier;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())

  // let projectFolder = __dirname;
  // let opts = {
  //   provider: "actions-provider",
  //   providerBaseUrl: `http://localhost:3001`,
  //   // pactUrls: ['./pacts'], // if you don't use a broker
  //   pactBrokerUrl: "https://test.pactflow.io",
  //   pactBrokerUsername: "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
  //   pactBrokerPassword: "O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1",
  //   publishVerificationResult: false,
  //   providerVersionBranch: "main",
  //   providerVersion: "1.0.0" ,
  //   consumerVersionSelectors: [
  //     { mainBranch: true },
  //     { deployedOrReleased: true }
  //   ]
  // };
  
 
  
  await app.listen(3000);

  // new Verifier(opts)
  //     .verifyProvider()
  //     .then((output) => {
  //       console.log("Pact Verification Complete!");
  //       console.log(output);
  //     })
  //     .catch((e) => {
  //       console.error("Pact verification failed :(", e);
  //     });
}
bootstrap();
