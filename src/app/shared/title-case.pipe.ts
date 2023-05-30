import { Pipe, PipeTransform } from '@angular/core';

//各単語の最初の文字を大文字にするパイプ

// パイプ（Decorator）を使用して、パイプのメタデータを定義します。
// 'titlecase'はこのパイプの名前で、テンプレートで使用する際に指定します。
// pure: trueは、このパイプが純粋（pure）なパイプであることを示します。純粋なパイプは入力が変更された場合のみ実行されます。
//pure:true...これがデフォルトの設定です。
//入力が変更されたときにのみ再計算されます。
//オブジェクトや配列の中身が変わっても、そのオブジェクトや配列自体の参照が変わらなければパイプは再計算されません。
@Pipe({ name: 'titlecase', pure: true })

// パイプのクラスを定義します。このクラスはPipeTransformインターフェースを実装します。
// PipeTransformインターフェースには、transformメソッドが定義されています。
export class TitleCasePipe implements PipeTransform {
  // transformメソッドは、パイプが値をどのように変換するかを定義します。
  // ここでは、入力された文字列をタイトルケースに変換します。
  transform(input: string): string {
    // 入力された文字列が空の場合は空文字列を返します。
    return input.length === 0
      ? ''
      : // 入力された文字列が空でない場合は、正規表現を使って各単語の最初の文字を大文字にし、残りの文字を小文字にします。
        // 正規表現の詳細:
        // \wは単語文字（英数字またはアンダースコア）にマッチします。
        // \S*は非空白文字が0回以上続くシーケンスにマッチします。
        // これにより、単語の区切り（空白文字）までがマッチするため、各単語に対して変換を行います。
        input.replace(
          /\w\S*/g,
          (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase()
        );
  }
}
