import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {

  //TitleCasePipeクラスのインスタンスを作成します。これにより、テストでパイプのメソッドを呼び出すことができます。
  const pipe = new TitleCasePipe();

  // テスト1: 'abc' を 'Abc' に変換するかどうかをテストします
  it('transforms "abc" to "Abc"', () => {
    // 'pipe.transform('abc')'は、'TitleCasePipe'のtransformメソッドを呼び出し、文字列'abc'をタイトルケースに変換します。
    // 'toBe('Abc')'は、transformメソッドの結果が'Abc'と等しいかどうかをテストします。
    expect(pipe.transform('abc')).toBe('Abc');
  });

  // テスト2: 'abc def' を 'Abc Def' に変換するかどうかをテストします
  it('transforms "abc def" to "Abc Def"', () => {
    expect(pipe.transform('abc def')).toBe('Abc Def');
  });

  // ... 他のテスト ...

  // テスト4: 'Abc Def' は変換されずにそのままの状態であることをテストします
  it('leaves "Abc Def" unchanged', () => {
    expect(pipe.transform('Abc Def')).toBe('Abc Def');
  });

  // テスト5: 'abc-def' を 'Abc-def' に変換するかどうかをテストします
  it('transforms "abc-def" to "Abc-def"', () => {
    expect(pipe.transform('abc-def')).toBe('Abc-def');
  });

  // テスト6: '   abc   def' を '   Abc   Def' に変換するかどうかをテストします（スペースが保持されます）
  it('transforms "   abc   def" to "   Abc   Def" (preserves spaces)', () => {
    expect(pipe.transform('   abc   def')).toBe('   Abc   Def');
  });
});
