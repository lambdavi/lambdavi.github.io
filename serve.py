#!/usr/bin/env python3
"""Static server for the homepage, plus a way to store the cropped initial."""

from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SVG = ROOT / "assets" / "initial.svg"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        if self.path.split("?", 1)[0] != "/api/initial":
            self.send_error(404)
            return
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length)
        if length > 2_000_000 or b"<svg" not in raw[:800]:
            self.send_error(400)
            return
        SVG.write_bytes(raw)
        self.send_response(204)
        self.end_headers()


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 4173), Handler).serve_forever()
