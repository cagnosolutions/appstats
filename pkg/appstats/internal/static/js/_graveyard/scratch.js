// const MyBuffer = (function() {
//     class MyBuffer {
//         constructor(len, cap) {
//             if (cap - len < 0) {
//                 console.Error("cap - len must be positive");
//             }
//             // TODO(arl): value using TypedArray rather than Array here
//             this._buf = new Array(cap);
//             this._pos = 0;
//             this._len = len;
//             this._cap = cap;
//         }
//
//         push(pt) {
//             if (this._pos >= this._cap) {
//                 // this._buf.reverse();
//                 // this._buf.pop();
//                 // this._buf.reverse();
//                 // this._pos = this._len;
//
//                 this._buf.shift();
//                 this._pos = this._len;
//
//                 // // move data to the beginning of the buffer, effectively discarding
//                 // // the cap-len the oldest elements
//                 // this._buf.copyWithin(0, this._cap - this._len);
//                 // this._pos = this._len;
//                 // console.log(this._buf, this._pos, this._len, this._cap);
//             }
//             this._buf[this._pos] = pt;
//             this._pos++;
//             console.log('raw=' + this._buf + ', pos=' + this._pos + ', len=' + this._len + ', cap=' + this._cap);
//         }
//
//         length() {
//             return this._len;
//         }
//
//         capacity() {
//             return this._cap;
//         }
//
//         index(n) {
//             if (n > this.cap) {
//                 throw 'out of bounds exception!';
//             }
//             return this._buf[n];
//         }
//
//         raw() {
//             return this._buf;
//         }
//     }
//     return MyBuffer;
// }());
//
// function bufferTest() {
//     let buf = new MyBuffer(0, 10);
//     buf.push(0);
//     buf.push(1);
//     buf.push(2);
//     buf.push(3);
//     buf.push(4);
//     buf.push(5);
//     buf.push(6);
//     buf.push(7);
//     buf.push(8);
//     buf.push(9);
//     buf.push(10);
//     buf.push(11);
//     buf.push(12);
//     buf.push(13);
//     buf.push(14);
//     buf.push(15);
//     buf.push(16);
//     buf.push(17);
//     for (let i = 0; i < buf.length(); i++) {
//         console.log(buf.index(i));
//     }
//     console.log(buf.raw());
// }
//
//
