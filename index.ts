import * as ts from "typescript";
import { exec } from "child_process";

const args = process.argv.slice(2);

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  let args = '';
  program.emit();

  program.getSourceFile(fileNames[0])!.forEachChild(node => {
      if (ts.isVariableStatement(node)) {
        if (node.modifiers && node.modifiers.length != 0 &&
            node.modifiers[0].kind == ts.SyntaxKind.ExportKeyword)
        {
            args += `functions:${node.declarationList.declarations[0].name.getText()},`;
        }
      }
  });

  console.log(args);
  
  exec(args);
}

compile([args[0]], {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.Latest,
  module: ts.ModuleKind.CommonJS
});
