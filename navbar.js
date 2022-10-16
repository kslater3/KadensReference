

class NavigationMenu {
	menu_options = {
		'Algorithms': {
			options: {
				'Sort': {
					options: {
						'Merge Sort': {
							path: '/Algorithms/Sort/MergeSort'
						}
					}
				}
			}
		},

		'Data Structures': {
			options: {
				'Abstract Data Types': {
					options: {
						'List': {
							path: '/DataStructures/AbstractDataTypes/List'
						},

						'Set': {
							path: '/DataStructures/AbstractDataTypes/Set'
						},

						'Stack': {
							path: '/DataStructures/AbstractDataTypes/Stack'
						},

						'Queue': {
							path: '/DataStructures/AbstractDataTypes/Queue'
						},

						'Priority Queue': {
							path: '/DataStructures/AbstractDataTypes/PriorityQueue'
						},

						'Map': {
							path: '/DataStructures/AbstractDataTypes/Map'
						},

						'Tree': {
							path: '/DataStructures/AbstractDataTypes/Tree'
						},

						'Graph': {
							path: '/DataStructures/AbstractDataTypes/Graph'
						}
					}
				},

				'Linear Structures': {
					options: {
						'Array': {
							path: '/DataStructures/LinearStructures/Array'
						},

						'Linked List': {
							path: '/DataStructures/LinearStructures/LinkedList'
						}
					}
				},

				'Tree Structures': {
					options: {
						'Binary Search Tree': {
							path: '/DataStructures/TreeStructures/BinarySearchTree'
						},

						'Heap': {
							path: '/DataStructures/TreeStructures/Heap'
						},

						'B-Tree': {
							path: '/DataStructures/TreeStructures/BTree'
						}
					}
				},

				'Hash Structures': {
					options: {
						'Hash Map': {
							path: '/DataStructures/HashStructures/HashMap'
						}
					}
				},

				'Graph Structures': {
					options: {
						'Adjacency List': {
							path: '/DataStructures/GraphStructures/AdjacencyList'
						},

						'Adjacency Matrix': {
							path: '/DataStructures/GraphStructures/AdjacencyMatrix'
						}
					}
				}
			}
		},

		'Programming Paradigms': {
			options: {
				'Imperative': {
					options: {
						'Procedural': {
							path: '/ProgrammingParadigms/Imperative/Procedural'
						},

						'Object Oriented': {
							path: '/ProgrammingParadigms/Imperative/ObjectOriented'
						}
					}
				},

				'Declarative': {
					options: {
						'Functional': {
							path: '/ProgrammingParadigms/Declarative/Functional'
						}
					}
				}
			}
		}
	}


	isMenuOpen = false;


	constructor() {
		this.navbar_container = document.getElementById('navbar_container');

		this.navbar_hamburger = document.getElementById('navbar_hamburger');

		this.navbar_hamburger.addEventListener('click', () => {
			this.menuClick();
		});


		this.menu_container = document.createElement('div');
		this.menu_container.id = 'menu_container';
		this.menu_container.style.display = 'none';

		let afterNavbar = 0;

		for(let i = 0; i < document.body.childNodes.length; i++) {
			if(document.body.childNodes[i].id == 'navbar_container') {
				afterNavbar = i + 1;

				break;
			}
		}

		document.body.insertBefore(this.menu_container, document.body.childNodes[afterNavbar]);


		this.initialize_table();
	}


	build_submenu(optionName, subOptions, domParent) {
		let submenu_item = document.createElement('div');

		if('options' in subOptions) {
			//TODO: put the dropdown arrow image and handle swapping the up and down image
			let submenu_header = document.createElement('div');
			submenu_header.className = 'submenu_header';
			submenu_header.innerHTML = optionName;

			submenu_item.appendChild(submenu_header);

			let nested_submenu = document.createElement('div');
			nested_submenu.className = 'nested_submenu';
			nested_submenu.style.display = 'none'; // Initially, but the click handler will toggle this

			submenu_header.addEventListener('click', () => {
				if(nested_submenu.style.display == 'none') {
					nested_submenu.style.display = 'block';
				}else {
					nested_submenu.style.display = 'none';
				}
			});

			for(const [key, value] of Object.entries(subOptions.options)) {
				this.build_submenu(key, subOptions.options[key], nested_submenu);
			}

			submenu_item.appendChild(nested_submenu);
		}else {
			let link = document.createElement('a');
			link.href = subOptions.path;
			link.target = '_blank';
			link.className = 'submenu_link';

			let submenu_header = document.createElement('div');
			submenu_header.className = 'submenu_header';
			submenu_header.innerHTML = optionName;

			link.appendChild(submenu_header);

			submenu_item.appendChild(link);
		}

		domParent.appendChild(submenu_item);
	}

	initialize_table() {
		let option_container;

		for(const [key, value] of Object.entries(this.menu_options)) {
			option_container = document.createElement('div');
			option_container.className = 'option_container';

			this.build_submenu(key, this.menu_options[key], option_container);

			this.menu_container.appendChild(option_container);
		}

	}


	menuClick() {
		if(this.isMenuOpen) {
			this.menu_container.style.display = 'none';
		}else {
			this.menu_container.style.display = 'block';
		}


		this.isMenuOpen = !this.isMenuOpen;
	}
}





window.onload = function() {
	let menu = new NavigationMenu(navbar_container, navbar_hamburger);
}
