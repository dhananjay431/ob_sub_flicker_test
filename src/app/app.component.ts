import { Component, OnInit, VERSION } from '@angular/core';
import { from, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  data1:any ;
  data2:any ;
  data3:any ;
  data4:any ;
  sub = new Subject();
  change(){
    let arr = [
      'comments',
      'posts','albums','photos','posts','albums','comments','comments',
    ];

     let rn = Math.floor(Math.random() * arr.length)
     this.sub.next(arr[rn]);

     let rn2 = Math.floor(Math.random() * 100)
     this.data4 = this.gd('https://jsonplaceholder.typicode.com/todos/'+rn2);

  }
  time(t,d){
    let np = new Promise((a,b)=>{
       setTimeout(()=>{
         a(d)
       },t)
    });
    return from(np);
  }
  ngOnInit(){
    const that = this;
    this.data1 = this.gd('https://jsonplaceholder.typicode.com/todos/1');
    this.data2 = this.gd('https://jsonplaceholder.typicode.com/todos/2');
    this.data3 = this.sub.pipe(
      mergeMap(d => this.time(50,d)),
      mergeMap(d => {
         return this.gd('https://jsonplaceholder.typicode.com/'+d);
      })
    );
    this.data4 = this.gd('https://jsonplaceholder.typicode.com/todos/4');
    setTimeout(()=>{
      that.sub.next('users');
    },1000)
    
  }
  gd(url){
   let x = fetch(url)
  .then(response => response.json())
  return from(x);
  }


}
