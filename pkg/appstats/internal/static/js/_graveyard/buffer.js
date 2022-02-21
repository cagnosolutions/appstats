// // Buffer declares the Buffer class.
// const Buffer = (function() {
//     class Buffer {
//         constructor(len, cap) {
//             if (cap - len < 0) {
//                 console.Error("cap - len must be positive");
//             }
//
//             // TODO(arl): value using TypedArray rather than Array here
//             this._buf = new Array(cap);
//             this._pos = 0;
//             this._len = len;
//             this._cap = cap;
//         }
//         last() {
//             if (this.length() == 0) {
//                 throw 'Cannot call last() on an empty Buffer';
//             }
//             return this._buf[this._pos];
//         }
//         push(pt) {
//             if (this._pos >= this._cap) {
//                 // move data to the beginning of the buffer, effectively discarding
//                 // the cap-len the oldest elements
//                 this._buf.copyWithin(0, this._cap - this._len);
//                 this._pos = this._len;
//                 console.log(this._buf, this._pos, this._len, this._cap);
//             }
//
//             this._buf[this._pos] = pt;
//             this._pos++;
//         }
//         length() {
//                 if (this._pos > this._len) {
//                     return this._len;
//                 }
//
//                 return this._pos;
//             }
//         capacity() {
//             return this._cap;
//         }
//             // slice returns a slice of the len latest datapoints present in the buffer.
//         slice(len) {
//             // Cap the dimension of the returned slice to the data available
//             if (len > this.length()) {
//                 len = this.length();
//             }
//
//             let start = this._pos - len;
//             return this._buf.slice(start, start + len);
//         }
//
//         index(n) {
//             if (n > this.length()) {
//                 throw 'Index out of bounds (n='+n+', len='+this.length()+', cap='+this.capacity()+')';
//             }
//             return this._buf[n];
//         }
//
//         raw() {
//             return this._buf;
//         }
//     }
//
//
//     return Buffer;
// }());