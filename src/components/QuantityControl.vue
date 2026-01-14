<template>
	<div class="d-flex align-items-center quantity-control">
		<strong class="me-3">Amount:</strong>
		<div class="input-group">
			<button
				class="btn btn-outline-secondary"
				type="button"
				@click="decrement"
				@mousedown="startDecrementing"
				@touchstart="startDecrementing"
				@mouseup="stopChanging"
				@mouseleave="stopChanging"
				@touchend="stopChanging"
				:disabled="value <= min || disabled"
			>
				<i class="bi bi-dash"></i>
			</button>
			<input
				type="text"
				class="form-control text-center"
				:value="value"
				@input="handleInput"
				@blur="validateAndEmit"
				:disabled="disabled"
			/>
			<button
				class="btn btn-outline-secondary"
				type="button"
				@click="increment"
				@mousedown="startIncrementing"
				@touchstart="startIncrementing"
				@mouseup="stopChanging"
				@mouseleave="stopChanging"
				@touchend="stopChanging"
				:disabled="value >= max || disabled"
			>
				<i class="bi bi-plus"></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'QuantityControl',
	props: {
		value: {
			type: Number,
			required: true
		},
		min: {
			type: Number,
			default: 1
		},
		max: {
			type: Number,
			required: true
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:value'],
	data() {
		return {
			intervalId: null,
			timeoutId: null,
			isHolding: false,
			tempValue: ''
		}
	},
	beforeUnmount() {
		this.stopChanging()
	},
	methods: {
		handleInput(event) {
			const input = event.target.value
			const numbersOnly = input.replace(/[^0-9]/g, '')
			event.target.value = numbersOnly
			this.tempValue = numbersOnly
		},
		validateAndEmit(event) {
			let numValue = parseInt(this.tempValue) || this.min
			if (numValue < this.min) {
				numValue = this.min
			} else if (numValue > this.max) {
				numValue = this.max
			}
			event.target.value = numValue
			this.$emit('update:value', numValue)
		},
		decrement() {
			if (this.value > this.min) {
				this.$emit('update:value', this.value - 1)
			}
		},
		increment() {
			if (this.value < this.max) {
				this.$emit('update:value', this.value + 1)
			}
		},
		startChanging(method) {
			this.isHolding = true
			this.timeoutId = setTimeout(() => {
				this.timeoutId = setTimeout(() => {
					clearInterval(this.intervalId)
					this.intervalId = setInterval(method, 50)
				}, 2500)
				this.intervalId = setInterval(method, 150)
			}, 500)
		},
		stopChanging() {
			this.isHolding = false
			clearTimeout(this.timeoutId)
			clearInterval(this.intervalId)
			this.timeoutId = null
			this.intervalId = null
			if (window.getSelection) window.getSelection().removeAllRanges()
		},
		startIncrementing() {
			this.stopChanging()
			this.startChanging(this.increment)
		},
		startDecrementing() {
			this.stopChanging()
			this.startChanging(this.decrement)
		}
	}
}
</script>