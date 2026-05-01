import { Body, Controller, Get, Post } from "@nestjs/common";
import { createDocumentController, type ExtractRequest } from "../features/document-extraction";
import { createGatewayForRuntime } from "./gatewayRuntime";

const documentController = createDocumentController({
  gateway: createGatewayForRuntime(),
});

@Controller("documents")
export class DocumentsController {
  @Post("extract")
  async extract(@Body() body: ExtractRequest) {
    return documentController.extractDocument(body);
  }

  @Get("health")
  health() {
    return { ok: true };
  }
}
