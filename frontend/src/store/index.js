import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
	state :{
		unreadPosts:'',
		postsVisited: JSON.parse(localStorage.getItem('postsVisited')) || [],
	},
	mutations:{
		postsVisited(state, postsVisited){
			state.postsVisited = postsVisited
		}
	},
	getters:{
		
		UnreadPosts:state => {
			let arr = state.posts.filter(post => !state.postsVisited.includes(post._id))
			let arr2 = arr.filter(post => post.created_at > state.createdAt)
			let userId = localStorage.getItem('userId')
			return state.unreadPosts = arr2.filter(post => post.userId !== userId).length
		}
	},
	actions:{
		itsVisited(context, data){
			const itsVisited = JSON.parse(localStorage.getItem('postsVisited')) || [];
			if (!itsVisited.includes(data.id)) {
				itsVisited.push(data.id)
				context.commit('postsVisited', itsVisited)
				localStorage.setItem('postsVisited', JSON.stringify(itsVisited));	
			}
		}
		
	},
})