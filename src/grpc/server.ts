import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { sendHtmlMail } from "../mail/send-html-mail";
import { sendTelegramHtml } from "../telegram/telegram";

const PROTO_PATH = path.join(__dirname, "sandesh.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);

const proto = grpc.loadPackageDefinition(packageDefinition) as any;

const mailerProto = proto.sandesh;

async function sendEmailHandler(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>,
) {
  try {
    const { app_id, to, subject, body } = call.request;
    await sendHtmlMail({ app_id, to, subject, html: body });
    callback(null, {
      success: true,
    });
  } catch (error: any) {
    callback(null, {
      success: false,
    });
  }
}

async function sendTelegramHandler(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>,
) {
  try {
    const { html } = call.request;
    await sendTelegramHtml(html);
    callback(null, {
      success: true,
    });
  } catch (error: any) {
    callback(null, {
      success: false,
    });
  }
}

const server = new grpc.Server();

server.addService(mailerProto.MailerService.service, {
  SendEmail: sendEmailHandler,
  SendTelegram: sendTelegramHandler,
});

server.bindAsync(
  "0.0.0.0:50052",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) throw err;
    console.log(`gRPC mail server running on ${port}`);
  },
);
