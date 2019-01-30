import React, { Component } from 'react';
export default new class extends Component {
	html(s) {
		if (s === 65536) {
			return '😍';
		}
		if (s === 32768) {
			return '😘';
		}
		if (s === 16384) {
			return '😝';
		}
		if (s === 8192) {
			return '😜';
		}
		if (s === 4096) {
			return '😛';
		}
		if (s === 2048) {
			return '😄';
		}
		if (s === 1024) {
			return '😊';
		}
		if (s === 512) {
			return '😀';
		}
		if (s === 256) {
			return '😲';
		}
		if (s === 128) {
			return '😦';
		}
		if (s === 64) {
			return '😐';
		}
		if (s === 32) {
			return '😑';
		}
		if (s === 16) {
			return '😶';
		}
		if (s === 8) {
			return '😤';
		}
		if (s === 4) {
			return '😠';
		}
		if (s === 2) {
			return '😡';
		}
		if (s === 1) {
			return '👿';
		}

		return <span>{s}</span>
	}
}



// 😈😃
// 				☺	😉			😚	😗	😙
// 			😳	😁	😔	😌	😒	😞	😣	😢
// 😂	😭	😪	😥	😰	😅	😓	😩	😫	😨	😱
// 			😖	😆	😋	😷	😎	😴	😵	
// 😟		😧			😮	😬		😕	😯	
// 😇	😏	
