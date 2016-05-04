
export const getBlocks = (screen_name) => {
	return (dispatch) => {
		fetch(`/api/blocks/${screen_name}`, {
			credentials: "same-origin"
		})
		.then((res) => res.json())
		.then((responseData) => {
			if (responseData.success) {
				dispatch({
					type: "LOAD_BLOCKS",
					blocks: responseData.blocks
				});
			}
		})
	}
}