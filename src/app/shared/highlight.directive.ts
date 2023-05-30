import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

//selectorに宣言した名称[highlight]を使ってtemplate(html)の属性に適用する
@Directive({ selector: '[highlight]' })
/**
 * Set backgroundColor for the attached element to highlight color
 * and set the element's customProperty to true
 */
export class HighlightDirective implements OnChanges {
  //デフォルトの背景色(グレー)
  defaultColor = 'rgb(211, 211, 211)'; // lightgray

  //@Inputで背景色を受け取る
  //例えば、HTMLテンプレート内で[highlight]="'blue'"のように設定された場合
  //その値はbgColorプロパティにセットされ、ngOnChangesが呼び出されます。
  @Input('highlight') bgColor = '';

  //このクラスをコンストラクタに注入することで、ディレクティブ内からDOM要素に直接アクセスできます。
  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true;
  }

  //受け取った背景色があれば、更新する
  //this.el.nativeElement.style.backgroundColor...ディレクティブが適用されている要素の背景色
  //this.bgColor || this.defaultColor...this.bgColorに値が設定されていれば世の値が適応、
  //されていない場合this.defaultColorの値が使用されます。
  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor =this.bgColor || this.defaultColor;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
