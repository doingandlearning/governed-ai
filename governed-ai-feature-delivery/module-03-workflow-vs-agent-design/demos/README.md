*[Send the standard happy path request first — they've seen this trace.]*

```json
{
  "text": "Invoice #INV-2026 due in 14 days for 980 EUR from ACME Corp.",
  "source": "demo"
}
```

*[Then send the same request with `executionMode: "bounded_tool"`]:*

```json
{
  "text": "Invoice #INV-2026 due in 14 days for 980 EUR from ACME Corp.",
  "source": "demo",
  "executionMode": "bounded_tool"
}
```

*[Point at the `bounded_tool_selection` trace event:]*

```
workflow    🔧 bounded_tool_selection
             tools: ["entity_normalizer","external_web_search"]
             blocked: ["external_web_search"]
```

*[Then open `tools.ts` and show `ALLOWED_TOOLS`.]*
