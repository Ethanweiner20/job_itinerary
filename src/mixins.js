var expand = {
	methods: {
		autoExpand(field) {
			// Reset field height
			field.style.height = 'inherit';

			// Get the computed styles for the element
			var computed = window.getComputedStyle(field);

			// Calculate the height
			var height =
				parseInt(computed.getPropertyValue('border-top-width'), 10) +
				parseInt(computed.getPropertyValue('padding-top'), 10) +
				field.scrollHeight +
				parseInt(computed.getPropertyValue('padding-bottom'), 10) +
				parseInt(computed.getPropertyValue('border-bottom-width'), 10);

			field.style.height = height + 'px';
		},
		expandTextAreas() {
			document.querySelectorAll('textarea').forEach((textarea) => {
				this.autoExpand(textarea);
			});
		},
		expandOnInput(e) {
			if (e.target.tagName.toLowerCase() !== 'textarea') return;
			this.autoExpand(e.target);
		}
	}
};

export default expand;
