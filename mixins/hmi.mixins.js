export default {
  data() {
    return {
      reworkCategories: [
        { id: 1, name: 'Adonan Mixing' },
        { id: 2, name: 'Bubble Baking' },
        { id: 3, name: 'Bad Stock Sheet Baking' },
        { id: 4, name: 'Bad Stock Kue Packaging' },
        { id: 5, name: 'Bad Stock Kue Creaming' },
        { id: 6, name: 'Bad Stock Kue Cooling' },
        { id: 7, name: 'Bad Stock Kue Cutting' },
        { id: 8, name: 'Bad Stock Toll Packaging' }
      ],
      downtime: [
        {
          mechineId: 1,
          types: [
            { id: 1, name: 'Planned Downtime' },
            { id: 2, name: 'Unplanned Downtime' },
            { id: 3, name: 'Perfomance Losses' }
          ],
          reasons: [
            {
              typeId: 1,
              reason: [
                'Cleaning Baking Plate',
                'Preventive Maintenance',
                'Stock Opname',
                'National Holiday',
                'New Installation',
                'Deep Cleaning',
                'Trial R&D'
              ]
            },
            {
              typeId: 2,
              reason: [
                'Sensor Flame Detector Error',
                'Pipa Deposit Tersumbat',
                'Temperature Oven Tidak Stabil',
                'Cleaning Hopper Adonan',
                'Heating/burner Off',
                'Sensor Hopper Adonan Error',
                'Pressure Gas Turun',
                'Rantai Scrapper Rusak',
                'Locking Baking Plate Macet',
                'Pressure Angin Blower Turun',
                'Start-up Oven Lama',
                'Nozzle Burner Tidak Menyala'
              ]
            },
            {
              typeId: 3,
              reason: [
                'Reduce Speed',
                'Gas Shortage',
                'Cleaning Gang-way Baking Plate',
                '4M / Manpower Losses',
                'Shortage Material',
                'Sheet Menempel / Menumpuk',
                'Idle',
                'Cream & Coating',
                'Ganti Pipa Deposit',
                'Water Shortage',
                'RM & PM',
                'Minor Stoppages Losses'
              ]
            }
          ]
        },
        {
          mechineId: 2,
          types: [
            { id: 1, name: 'Planned Downtime' },
            { id: 2, name: 'Unplanned Downtime' },
            { id: 3, name: 'Perfomance Losses' }
          ],
          reasons: [
            {
              typeId: 1,
              reason: [
                'Cleaning Baking Plate',
                'Preventive Maintenance',
                'Stock Opname',
                'National Holiday',
                'New Installation',
                'Deep Cleaning',
                'Trial R&D'
              ]
            },
            {
              typeId: 2,
              reason: [
                'Baut Sirip Cooling Box Longgar',
                'Sensor Cooling Box Error',
                'Pergantian Sensor Proximity',
                'Motor Archooler Korslet',
                'Roundbelt Putus'
              ]
            },
            {
              typeId: 3,
              reason: [
                'Reduce Speed',
                'Gas Shortage',
                'Cleaning Gang-way Baking Plate',
                '4M / Manpower Losses',
                'Shortage Material',
                'Sheet Menempel / Menumpuk',
                'Idle',
                'Cream & Coating',
                'Ganti Pipa Deposit',
                'Water Shortage',
                'RM & PM',
                'Minor Stoppages Losses'
              ]
            }
          ]
        },
        {
          mechineId: 3,
          types: [
            { id: 1, name: 'Planned Downtime' },
            { id: 2, name: 'Unplanned Downtime' },
            { id: 3, name: 'Perfomance Losses' }
          ],
          reasons: [
            {
              typeId: 1,
              reason: [
                'Cleaning Baking Plate',
                'Preventive Maintenance',
                'Stock Opname',
                'National Holiday',
                'New Installation',
                'Deep Cleaning',
                'Trial R&D'
              ]
            },
            {
              typeId: 2,
              reason: [
                'Baut Sirip Cooling Box Longgar',
                'Sensor Cooling Box Error',
                'Pergantian Sensor Proximity',
                'Motor Archooler Korslet',
                'Roundbelt Putus'
              ]
            },
            {
              typeId: 3,
              reason: [
                'Reduce Speed',
                'Gas Shortage',
                'Cleaning Gang-way Baking Plate',
                '4M / Manpower Losses',
                'Shortage Material',
                'Sheet Menempel / Menumpuk',
                'Idle',
                'Cream & Coating',
                'Ganti Pipa Deposit',
                'Water Shortage',
                'RM & PM',
                'Minor Stoppages Losses'
              ]
            }
          ]
        },
        {
          mechineId: 4,
          types: [
            { id: 1, name: 'Planned Downtime' },
            { id: 2, name: 'Unplanned Downtime' },
            { id: 3, name: 'Perfomance Losses' }
          ],
          reasons: [
            {
              typeId: 1,
              reason: [
                'Cleaning Baking Plate',
                'Preventive Maintenance',
                'Stock Opname',
                'National Holiday',
                'New Installation',
                'Deep Cleaning',
                'Trial R&D'
              ]
            },
            {
              typeId: 2,
              reason: [
                'Frame Cutting Putus',
                'Magazine Unsmooth',
                'Pusher Unsmooth'
              ]
            },
            {
              typeId: 3,
              reason: [
                'Reduce Speed',
                'Gas Shortage',
                'Cleaning Gang-way Baking Plate',
                '4M / Manpower Losses',
                'Shortage Material',
                'Sheet Menempel / Menumpuk',
                'Idle',
                'Cream & Coating',
                'Ganti Pipa Deposit',
                'Water Shortage',
                'RM & PM',
                'Minor Stoppages Losses'
              ]
            }
          ]
        },
        {
          mechineId: 5,
          types: [
            { id: 1, name: 'Planned Downtime' },
            { id: 2, name: 'Unplanned Downtime' },
            { id: 3, name: 'Perfomance Losses' }
          ],
          reasons: [
            {
              typeId: 1,
              reason: [
                'Cleaning Baking Plate',
                'Preventive Maintenance',
                'Stock Opname',
                'National Holiday',
                'New Installation',
                'Deep Cleaning',
                'Trial R&D'
              ]
            },
            {
              typeId: 2,
              reason: [
                'Coding Tidak Sempurna',
                'Sensor Gate Conveyor Error',
                'Pusher Gate Error',
                'Temperature Seal Tidak Stabil',
                'Pisau Seal Tumpul',
                'Wire Cutting Putus',
                'Belt Conveyor Sobek',
                'Bearing Conveyor Rusak'
              ]
            },
            {
              typeId: 3,
              reason: [
                'Reduce Speed',
                'Gas Shortage',
                'Cleaning Gang-way Baking Plate',
                '4M / Manpower Losses',
                'Shortage Material',
                'Sheet Menempel / Menumpuk',
                'Idle',
                'Cream & Coating',
                'Ganti Pipa Deposit',
                'Water Shortage',
                'RM & PM',
                'Minor Stoppages Losses'
              ]
            }
          ]
        }
      ]
    }
  }
}
