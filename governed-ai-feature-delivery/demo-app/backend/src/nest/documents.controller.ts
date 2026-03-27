import { Body, Controller, Get, Post } from "@nestjs/common";
import { createDocumentController } from "../controllers/documentController";
import type { ExtractRequest } from "../types";
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
