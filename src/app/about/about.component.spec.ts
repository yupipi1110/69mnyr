import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { HighlightDirective } from '../shared/highlight.directive';

// テストするコンポーネントのフィクスチャ（実体）を定義
//ComponentFixtureはAngularのテストフレームワークによって提供され、
//テストするコンポーネントのインスタンスやテンプレートにアクセスするために使用されます。
let fixture: ComponentFixture<AboutComponent>;

//AboutComponentとその内部で使用されるhighlightDirectiveに関するテストケースをグループ化しています。
describe('AboutComponent (highlightDirective)', () => {
  //beforeEachはJasmineの関数で、各テストケースの前に実行される処理を定義します。
  //TestBed.configureTestingModuleを使ってテスト環境を設定し、テスト対象のコンポーネントのインスタンスを作成しています。
  //そして、fixture.detectChanges()を呼び出すことで初期のデータバインディングをトリガーしています。
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      //declarationsにテストするコンポーネントとディレクティブを指定
      declarations: [AboutComponent, HighlightDirective],
      //schemasにCUSTOM_ELEMENTS_SCHEMAを指定
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      // AboutComponentを作成
      .createComponent(AboutComponent);

    // コンポーネントの初期バインディングをトリガー（データバインディングを行い、ngOnInitを呼び出す）
    fixture.detectChanges();
  });

  //itもJasmineの関数で、個々のテストケースを定義します。
  // '<h2>'がskyblueであるべきであるというテストケースを定義
  it('should have skyblue <h2>', () => {
    
    // fixtureからネイティブエレメントを取得し、その中から'<h2>'エレメントを選択
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');

    // '<h2>'エレメントの背景色を取得
    const bgColor = h2.style.backgroundColor;

    // 取得した背景色が'skyblue'であることを期待（アサーション）
    expect(bgColor).toBe('skyblue');
  });
});
