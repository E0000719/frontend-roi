# Mapeo de Datos - Dashboard Agentic AI

Este documento describe la estructura de datos utilizada en las pantallas principales del dashboard.

---

## 1. On Track Agents (`/on-track-agents`)

### Métricas Principales (metricsData)
```typescript
{
  label: string;           // Nombre de la métrica
  value: string;           // Valor actual (formatado)
  change: string;          // Cambio vs período anterior
  icon: LucideIcon;        // Icono de la métrica
  color: string;           // Color del icono
}
```

**Datos calculados:**
- Total Cost Savings: Suma de todos los Annual Savings de departamentos
- AI Agents Deployed: 42 agentes
- Productivity Gain: 37.8%
- ROI: 342%

### Datos de Rendimiento de Agentes (agentPerformanceData)
```typescript
{
  name: string;            // Nombre del agente (ej: "AP-Bot-01")
  department: string;      // Departamento asignado
  tasks: number;           // Tareas completadas
  efficiency: string;      // Porcentaje de eficiencia
  status: "active" | "maintenance";  // Estado del agente
}
```

**Agentes actuales:**
- AP-Bot-01 (Finance): 1,245 tareas, 98.7% eficiencia
- HR-Assistant-03 (HR): 876 tareas, 95.2% eficiencia
- Support-Agent-12 (Customer Service): 2,341 tareas, 97.8% eficiencia
- Sales-Assistant-05 (Sales): 543 tareas, 92.1% eficiencia
- IT-Support-02 (IT): 1,087 tareas, 99.3% eficiencia

### Desglose por Departamento (departmentBreakdown)
```typescript
{
  name: string;            // Nombre del departamento
  progress: number;        // Porcentaje de progreso (0-100)
}
```

**Departamentos:**
- Finance: 92%
- Human Resources: 78%
- Customer Service: 85%
- Sales: 45%
- IT: 96%

### Progreso de Implementación
```typescript
{
  phase: string;           // "Phase 3: Department Expansion"
  percentage: number;      // 75%
  milestone: string;       // "Sales Department Integration"
  dueDate: string;        // "May 15, 2025"
}
```

---

## 2. Continuous Process Improvement (`/process-improvement`)

### Datos de Rendimiento de Agentes (agentPerformanceData)
```typescript
{
  name: string;            // Nombre del agente
  department: string;      // Departamento
  tasks: number;           // Tareas completadas
  efficiency: string;      // Porcentaje de eficiencia
  status: "active" | "maintenance";  // Estado
}
```

**Mismo conjunto de datos que On Track Agents:**
- AP-Bot-01, HR-Assistant-03, Support-Agent-12, Sales-Assistant-05, IT-Support-02

### Opciones de Inicio
```typescript
{
  option: "roi-first" | "gpt-roi";
  label: string;           // "ROI First Assistant" | "GPT ROI First"
  route: string;           // "/roi-business-case"
}
```

---

## 3. 360 Company AI Adoption (`/ai-adoption`)

### Reducción de Headcount (headcountReductionData)
```typescript
{
  month: string;           // "Jan", "Feb", etc.
  actual: number;          // Headcount actual
  projected: number;       // Headcount proyectado
}
```

**Datos mensuales:** 
- Inicio: 320 (Jan) → Final: 190 (Dec)
- Progreso actual: 247 headcount (84% completado)

### Ahorros por Departamento (departmentSavings)
```typescript
{
  name: string;                    // Nombre del departamento
  positions: number;               // Posiciones reducidas
  savings: number;                 // Ahorro anual en USD
  progress: number;                // Progreso de implementación (%)
  monthlySavings: Array<{          // Ahorros mensuales
    month: string;                 // Mes
    value: number;                 // Ahorro en USD
  }>;
}
```

**Departamentos:**

1. **Finance & Accounting**
   - Posiciones: 68
   - Ahorro Anual: $4,080,000
   - Progreso: 100%
   - Ahorros mensuales: $408,000/mes (iniciado en Marzo)

2. **Customer Support**
   - Posiciones: 32
   - Ahorro Anual: $1,536,000
   - Progreso: 100%
   - Ahorros mensuales: $128,000/mes (todo el año)

3. **HR & Administration**
   - Posiciones: 42
   - Ahorro Anual: $2,016,000
   - Progreso: 100%
   - Ahorros mensuales: ~$183,273/mes (iniciado en Febrero)

4. **Sales Operations**
   - Posiciones: 28
   - Ahorro Anual: $1,680,000
   - Progreso: 85%
   - Ahorros mensuales: $210,000/mes (iniciado en Mayo)

5. **IT Operations**
   - Posiciones: 55
   - Ahorro Anual: $3,630,000
   - Progreso: 92%
   - Ahorros mensuales: $302,500/mes (todo el año)

6. **Legal**
   - Posiciones: 22
   - Ahorro Anual: $1,584,000
   - Progreso: 78%
   - Ahorros mensuales: $264,000/mes (iniciado en Julio)

### Totales Consolidados
```typescript
{
  totalSavings: 14526000;          // $14.53M (suma de todos los departamentos)
  totalPositions: 247;             // Total de posiciones reducidas
  currentHeadcount: 247;           // Headcount actual
  progressPercent: 84;             // Progreso general
}
```

---

## Relaciones entre Pantallas

### Datos Compartidos
1. **Total Cost Savings**: 
   - Calculado en On Track Agents a partir de departmentSavings de AI Adoption
   - Valor: $14.53M

2. **Agent Performance Data**:
   - Compartido entre On Track Agents y Process Improvement
   - 5 agentes en total

3. **Department Progress**:
   - On Track Agents muestra progreso simplificado
   - AI Adoption muestra progreso detallado con ahorros mensuales

### Flujo de Datos
```
AI Adoption (departmentSavings)
    ↓
On Track Agents (Total Cost Savings)
    ↓
Process Improvement (Agent Selection)
    ↓
ROI Business Case (Analysis)
```

---

## Notas de Implementación

1. **Consistencia de Datos**: Los ahorros mensuales deben sumar exactamente el Annual Savings de cada departamento.

2. **Estado por Defecto**: En AI Adoption, el primer departamento (Finance & Accounting) está seleccionado por defecto para mostrar la gráfica de ahorros mensuales.

3. **Formato de Moneda**: Todos los valores monetarios se formatean como:
   - Millones: `$X.XXM`
   - Miles: `$X,XXX` o `$XXXK`

4. **Porcentajes**: Se muestran con 1-2 decimales según el contexto.

5. **Fechas**: Formato de meses: "Jan", "Feb", "Mar", etc.
