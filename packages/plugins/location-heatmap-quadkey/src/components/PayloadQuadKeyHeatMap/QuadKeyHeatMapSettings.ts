import { DefaultMapSettings } from '../../../../../map'

const QuadKeyHeatMapSettings = DefaultMapSettings()
const { debugLayer, scrollToZoom, fitToPoints } = QuadKeyHeatMapSettings
debugLayer.hidden = false
scrollToZoom.value = false
fitToPoints.value = true

export { QuadKeyHeatMapSettings }
