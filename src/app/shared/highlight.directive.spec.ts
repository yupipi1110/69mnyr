import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

//これらのテストはHighlightDirectiveが正しく動作すること、また期待される範囲で適用されることを確認しています。

// テスト用のComponentを作成します。
@Component({
  template: `
  <h2 highlight="yellow">Something Yellow</h2>
  <h2 highlight>The Default (Gray)</h2>
  <h2>No Highlight</h2>
  <input #box [highlight]="box.value" value="cyan"/>`,
})
class TestComponent {}

// HighlightDirectiveに関するテストをグループ化します。
describe('HighlightDirective', () => {
  // 変数の定義
  //テストのために作成されるコンポーネントの固定値です。各テストケースで利用されます。
  let fixture: ComponentFixture<TestComponent>;
  //ディレクティブが適用されている3つの要素を表すDebugElementの配列です。
  let des: DebugElement[];
  //ディレクティブが適用されていないh2要素を表すDebugElementです。
  let bareH2: DebugElement;

  // 各テストケース実行前の共通処理
  //テストモジュールの設定やテスト対象のコンポーネントの初期化、
  //初期のデータバインディング、そしてテスト対象の要素の取得が行われています。
  beforeEach(() => {
    // テスト対象のコンポーネントを設定
    fixture = TestBed.configureTestingModule({
      //declarationsにテストするコンポーネントとディレクティブを指定
      declarations: [HighlightDirective, TestComponent],
    }).createComponent(TestComponent);
    // TestComponentを作成

    // 初期のデータバインディング
    fixture.detectChanges();

    // ディレクティブが適用されている全ての要素を取得
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    // ディレクティブが適用されていないh2要素を取得
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });

  // テスト1: ハイライトされている要素が3つあることを確認
  //toBeメソッドは、期待値が特定の値と厳密に等しいかどうかを検証するためのものです。
  // des.lengthは、指定したクラスまたはセレクタを持つDOM要素の配列の長さを返します。ここでは3つの要素が期待されています。
  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  // テスト2: 1つ目の<h2>の背景色が"yellow"であることを確認
  // des[0].nativeElement.style.backgroundColorは、最初のハイライトされた要素の背景色を取得します。
  it('should color 1st <h2> background "yellow"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  // テスト3: 2つ目の<h2>の背景色がデフォルト色であることを確認
  // HighlightDirectiveのdefaultColorプロパティの値が、2つ目のハイライトされた要素の背景色と一致していることを確認します。
  it('should color 2nd <h2> background w/ default color', () => {
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  // テスト4: <input>の背景色がvalue色とバインドされていることを確認
  // <input>要素の背景色が、そのvalueプロパティにバインドされていることを確認します。
  it('should bind <input> background to value color', () => {
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor)
      .withContext('initial backgroundColor')
      .toBe('cyan');

    input.value = 'green';

    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor)
      .withContext('changed backgroundColor')
      .toBe('green');
  });

  // テスト5: ディレクティブが適用されていないh2要素はcustomPropertyを持っていないことを確認
  // ディレクティブが適用されていない要素には、customPropertyが存在しないはずです。
  it('bare <h2> should not have a customProperty', () =>
    it('bare <h2> should not have a customProperty', () => {
      expect(bareH2.properties['customProperty']).toBeUndefined();
    }));

  // テスト6: 1つ目の<h2>にHighlightDirectiveが注入できることを確認
  // des[0].injector.get(HighlightDirective)は、最初のハイライトされた要素にHighlightDirectiveが注入されているか確認します。
  // toBeTruthy()は、返される値が真偽値の真(true)に評価されるかどうかをテストします。
  it('can inject `HighlightDirective` in 1st <h2>', () => {
    const dir = des[0].injector.get(HighlightDirective);
    expect(dir).toBeTruthy();
  });

  // テスト7: 3つ目の<h2>にHighlightDirectiveが注入できないことを確認
  // bareH2.injector.get(HighlightDirective, null)は、ハイライトされていない3つ目の要素にHighlightDirectiveが注入されていないことを確認します。
  // toBe(null)は、返される値がnullであることをテストします。
  it('cannot inject `HighlightDirective` in 3rd <h2>', () => {
    const dir = bareH2.injector.get(HighlightDirective, null);
    expect(dir).toBe(null);
  });

  // テスト8: 1つ目の<h2>のproviderTokensにHighlightDirectiveが含まれていることを確認
  // des[0].providerTokensは、最初のハイライトされた要素のプロバイダトークンを返します。これは、要素が依存するプロバイダのリストです。
  // toContain(HighlightDirective)は、そのリストがHighlightDirectiveを含んでいるかどうかをテストします。
  it('should have `HighlightDirective` in 1st <h2> providerTokens', () => {
    expect(des[0].providerTokens).toContain(HighlightDirective);
  });

  // テスト9: 3つ目の<h2>のproviderTokensにHighlightDirectiveが含まれていないことを確認
  // not.toContain(HighlightDirective)は、そのリストがHighlightDirectiveを含んでいないかどうかをテストします。
  it('should not have `HighlightDirective` in 3rd <h2> providerTokens', () => {
    expect(bareH2.providerTokens).not.toContain(HighlightDirective);
  });
});
