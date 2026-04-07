import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { sendHtmlMail } from "../mail/send-html-mail";

const PROTO_PATH = path.join(__dirname, "sandesh.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);

const proto = grpc.loadPackageDefinition(packageDefinition) as any;

const mailerProto = proto.sandesh;

async function sendEmailHandler(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>,
) {}
