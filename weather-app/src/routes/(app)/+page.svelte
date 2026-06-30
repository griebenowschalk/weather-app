<script lang="ts">
	let { data } = $props();
</script>

<h1>{data.initial.location.name}</h1>
<p>{data.initial.current.condition.text} — {data.initial.current.temp_c}°C</p>
